/**
 * 第 15 关 · React 19 其它新特性合集
 * ------------------------------------------------------------
 * 这一关一次演示三个"小而实用"的 React 19 改进:
 *   ① ref 直接作为 prop —— 函数组件不再需要 forwardRef
 *   ② 组件里直接写 <title>/<meta>/<link> —— 文档元数据自动提升到 <head>
 *   ③ ref 回调可以返回"清理函数" —— 和 useEffect 的清理思路一致
 */
import { useRef } from 'react'

// ① React 19:ref 可以像普通 prop 一样直接接收,不必再包 forwardRef!
//    (在 React 18 里,函数组件想拿到 ref 必须用 forwardRef 包一层。)
function FancyInput({ placeholder, ref }) {
  return <input ref={ref} placeholder={placeholder} />
}

export default function React19Extras() {
  const inputRef = useRef(null)

  return (
    <div className="demo-card">
      <h2>React 19 · 实用小改进</h2>

      {/* ② 文档元数据:直接写在组件里,React 19 会自动把它挪到 <head>。
          打开浏览器标签页看看标题变了没,或用开发者工具查看 <head>。 */}
      <title>React 闯关实验室 · 第 15 关</title>
      <meta name="description" content="React 19 新特性演示关卡" />

      <div className="mini-card">
        <h3>① ref 作为 prop(告别 forwardRef)</h3>
        <FancyInput ref={inputRef} placeholder="点右边按钮会聚焦到我" />
        <div className="btn-row">
          <button onClick={() => inputRef.current?.focus()}>聚焦输入框</button>
          <button onClick={() => { if (inputRef.current) inputRef.current.value = '' }}>
            清空
          </button>
        </div>
        <p className="count">
          FancyInput 是普通函数组件,直接从 props 解构出 ref —— 在 React 18 这必须用
          forwardRef 才行。
        </p>
      </div>

      <div className="mini-card">
        <h3>② 文档元数据自动提升</h3>
        <p className="count">
          本关组件里写了 &lt;title&gt; 和 &lt;meta&gt;,React 19 已自动把它们放进
          页面 &lt;head&gt;。以前得靠额外的库(如 react-helmet)才能做到。
        </p>
      </div>

      <div className="mini-card">
        <h3>③ ref 回调支持清理函数</h3>
        <div
          ref={(node) => {
            if (node) {
              node.dataset.mounted = 'yes'
              // React 19:ref 回调可以 return 一个清理函数,元素卸载时调用
              return () => {
                // 这里可做解绑监听、取消订阅等清理
                console.log('[第15关] ref 清理函数被调用')
              }
            }
          }}
        >
          <p className="count">
            这个盒子用 ref 回调设置了 data 属性,并返回了清理函数(切走本关时会在
            控制台打印日志)。这与 useEffect 的清理理念一致。
          </p>
        </div>
      </div>

      <details className="hint" style={{ marginTop: 12 }}>
        <summary>还有哪些 19 的变化值得知道?</summary>
        <p>
          还有:React Compiler(自动记忆化,少写 useMemo/useCallback)、
          Server Components / Server Actions(服务端渲染新范式)、
          以及 useDeferredValue 支持初始值等。这些偏工程/服务端,
          先把本关这三个"客户端常用"的吃透即可。
        </p>
      </details>
    </div>
  )
}
