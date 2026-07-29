/**
 * 页面内实时代码编辑器 + 预览。
 * 原理:
 *   1. 用 @babel/standalone 把用户编辑的 JSX 源码转译成普通 JS;
 *   2. 转译时去掉 import 语句(浏览器 eval 无法解析 ESM import),
 *      把 React / 各种 Hook 作为局部变量注入 new Function 的作用域;
 *   3. 把源码里的 `export default XXX` 改写成 `return XXX`,
 *      执行后拿到默认导出的组件函数,交给 React 渲染。
 * 这样你就能在页面上边改边看,和改本地文件的效果一致(但不写盘)。
 */
import { useState, useEffect, useMemo, useRef, useCallback, useReducer } from 'react'
import { useContext, createContext, useTransition, useDeferredValue } from 'react'
import { use, Suspense, startTransition, useOptimistic, useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import ErrorBoundary from './ErrorBoundary.jsx'

// Babel 体积较大(~2.5MB),用动态 import 懒加载:
// 只有真正用到"页面编辑"时才下载它,不拖慢首屏。
let babelPromise = null
function loadBabel() {
  if (!babelPromise) babelPromise = import('@babel/standalone')
  return babelPromise
}

// 提供给沙箱代码使用的"依赖"。用户代码里的 import 会被剥离,
// 这些名字通过 new Function 的参数注入,所以 import 的东西照样能用。
const scope = {
  React: { createElement: undefined }, // 占位,下面用真实的 react 覆盖
  useState, useEffect, useMemo, useRef, useCallback, useReducer,
  useContext, createContext, useTransition, useDeferredValue,
  use, Suspense, startTransition, useOptimistic, useActionState,
  useFormStatus,
}

// 用真正的 React 命名空间(含 createElement / Fragment,JSX 编译后需要 React.xxx)
import * as ReactNS from 'react'
import * as ReactDOMNS from 'react-dom'
scope.React = ReactNS
scope.ReactDOM = ReactDOMNS

/** 把一段 JSX 源码编译成一个"返回默认导出组件"的函数 */
function compile(Babel, source) {
  // 1. 去掉所有 import 行(依赖改由 scope 注入)
  let code = source.replace(/^\s*import[^\n]*\n/gm, '')
  // 2. export default 组件名  ->  return 组件名
  //    export default function X(){}  ->  function X(){}; return X;
  code = code.replace(
    /export\s+default\s+function\s+([A-Za-z0-9_$]+)/,
    'function $1'
  )
  // 若是 `function X` 形式,补一个 return(下面统一处理)
  const defaultNameMatch = source.match(/export\s+default\s+function\s+([A-Za-z0-9_$]+)/)
  const defaultExprMatch = source.match(/export\s+default\s+([A-Za-z0-9_$]+)\s*;?/)
  // export default X;  ->  return X;
  code = code.replace(/export\s+default\s+([A-Za-z0-9_$]+)\s*;?/, 'return $1;')

  if (defaultNameMatch) {
    code += `\nreturn ${defaultNameMatch[1]};`
  } else if (!defaultExprMatch && !/return\s+[A-Za-z0-9_$]+;?\s*$/.test(code)) {
    // 兜底:找不到默认导出
    throw new Error('没找到 `export default`,请保留一个默认导出的组件。')
  }

  // 3. Babel 转译 JSX(allowReturnOutsideFunction 允许我们注入的顶层 return)
  const transformed = Babel.transform(code, {
    presets: [['react', { runtime: 'classic' }]],
    parserOpts: { allowReturnOutsideFunction: true },
    filename: 'lesson.jsx',
  }).code

  return transformed
}

/** 根据源码得到组件(失败则抛错,交给上层显示) */
function evaluate(Babel, source) {
  const compiled = compile(Babel, source)
  const names = Object.keys(scope)
  const values = names.map((n) => scope[n])
  // eslint-disable-next-line no-new-func
  const factory = new Function(...names, compiled)
  const Comp = factory(...values)
  if (typeof Comp !== 'function') {
    throw new Error('默认导出不是一个组件函数。')
  }
  return Comp
}

export default function LiveSandbox({ lessonId, initialCode, answer }) {
  const storeKey = `react-lab-code-${lessonId}`
  const [code, setCode] = useState(() => {
    try {
      return localStorage.getItem(storeKey) ?? initialCode
    } catch {
      return initialCode
    }
  })
  // "已提交并成功编译"的组件 + 错误信息
  const [Comp, setComp] = useState(null)
  const [error, setError] = useState(null)
  const [runKey, setRunKey] = useState(0)
  const debounceRef = useRef(null)

  // 编译并运行(防抖 400ms,避免每敲一下都编译)
  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        const Babel = await loadBabel()
        const C = evaluate(Babel, code)
        setComp(() => C)
        setError(null)
        setRunKey((k) => k + 1) // 换 key 让预览彻底重挂载,重置内部 state
      } catch (e) {
        setError(e.message || String(e))
      }
      try {
        localStorage.setItem(storeKey, code)
      } catch {}
    }, 400)
    return () => clearTimeout(debounceRef.current)
  }, [code, storeKey])

  const reset = useCallback(() => {
    if (confirm('确定放弃当前修改,恢复到初始代码吗?')) {
      setCode(initialCode)
      try { localStorage.removeItem(storeKey) } catch {}
    }
  }, [initialCode, storeKey])

  const showAnswer = useCallback(() => {
    if (!answer) return
    if (confirm('确定要用参考答案替换当前代码吗?你的修改会被覆盖。')) {
      setCode(answer)
    }
  }, [answer])

  // 编辑器里按 Tab 插入两个空格,而不是切换焦点
  const onKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const el = e.target
      const s = el.selectionStart
      const en = el.selectionEnd
      const next = code.slice(0, s) + '  ' + code.slice(en)
      setCode(next)
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + 2
      })
    }
  }

  return (
    <div className="sandbox">
      {/* 预览区 */}
      <div className="sandbox-preview">
        <div className="sandbox-preview-label">实时预览</div>
        {error ? (
          <div className="boundary-box">
            <h4>😵 代码有错误</h4>
            <pre>{error}</pre>
            <p className="crumb">修正后预览会自动恢复。</p>
          </div>
        ) : Comp ? (
          <ErrorBoundary key={runKey}>
            <Comp />
          </ErrorBoundary>
        ) : (
          <p className="crumb">准备中…</p>
        )}
      </div>

      {/* 编辑区 */}
      <div className="sandbox-editor">
        <div className="sandbox-toolbar">
          <span className="sandbox-file">✏️ 在这里改代码,自动运行</span>
          <span className="done-actions">
            {answer && (
              <button className="btn-ghost" onClick={showAnswer}>
                看答案
              </button>
            )}
            <button className="btn-ghost" onClick={reset}>
              重置
            </button>
          </span>
        </div>
        <textarea
          className="sandbox-code"
          spellCheck={false}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  )
}
