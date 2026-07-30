/**
 * 第 20 关 · React 19 实用改进 + React Compiler
 * ------------------------------------------------------------
 * 一次演示 React 19 的三个"小而实用"改进 + React Compiler 概念:
 *   ① ref 直接作为 prop -- 不再需要 forwardRef
 *   ② 组件里直接写 <title>/<meta> -- 自动提升到 <head>
 *   ③ ref 回调支持清理函数
 *   ④ React Compiler -- 自动记忆化,少写 useMemo/useCallback
 */
import { useRef, useState, useMemo } from 'react'

// ① ref 作为 prop
function FancyInput({ ref, placeholder }) {
  return <input ref={ref} placeholder={placeholder} />
}

// ④ React Compiler 概念演示
// 在有 Compiler 的项目中,下面这个组件即使不写 useMemo,
// Compiler 也会自动判断 double 是否需要重新计算。
// 目前(无 Compiler)我们仍需手写 useMemo:
function ExpensiveCalc({ n }) {
  const double = useMemo(() => {
    console.log('重新计算 double...')
    return n * 2
  }, [n])
  return <p className="count">n={n}, double={double}(手写 useMemo)</p>
}

export default function React19Compiler() {
  const inputRef = useRef(null)
  const [n, setN] = useState(1)
  const [unused, setUnused] = useState(0) // 改它不应触发 double 重算

  return (
    <div className="demo-card">
      <h2>React 19 改进 + Compiler</h2>

      {/* ② 文档元数据:自动提升到 <head> */}
      <title>React 闯关实验室 · 第 20 关</title>
      <meta name="description" content="React 19 新特性与 Compiler" />

      <div className="mini-card">
        <h3>① ref 作为 prop(告别 forwardRef)</h3>
        <FancyInput ref={inputRef} placeholder="点按钮聚焦我" />
        <div className="btn-row">
          <button className="btn-primary" onClick={() => inputRef.current?.focus()}>聚焦</button>
        </div>
      </div>

      <div className="mini-card">
        <h3>② 文档元数据自动提升</h3>
        <p className="count">
          本关写了 &lt;title&gt; 和 &lt;meta&gt;,React 19 已自动放进 &lt;head&gt;。
        </p>
      </div>

      <div className="mini-card">
        <h3>③ ref 回调清理函数</h3>
        <div
          ref={(node) => {
            if (node) {
              node.dataset.mounted = 'yes'
              return () => console.log('[第20关] ref 清理')
            }
          }}
        >
          <p className="count">ref 回调返回了清理函数,卸载时调用(与 useEffect 清理一致)。</p>
        </div>
      </div>

      <div className="mini-card">
        <h3>④ React Compiler(概念)</h3>
        <ExpensiveCalc n={n} />
        <div className="btn-row">
          <button onClick={() => setN((v) => v + 1)}>改 n(会重算 double)</button>
          <button onClick={() => setUnused((v) => v + 1)}>改 unused(不应重算)</button>
          <span className="count">unused={unused}</span>
        </div>
        <p className="count" style={{ marginTop: 8 }}>
          有 React Compiler 时,连 useMemo 都不用写 -- 它自动分析依赖、自动记忆化。
          目前需手动启用,是 React 19 生态的重要方向。
        </p>
      </div>
    </div>
  )
}
