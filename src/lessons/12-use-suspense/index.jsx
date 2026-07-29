/**
 * 第 12 关 · use + Suspense(React 19 新特性)
 * ------------------------------------------------------------
 * React 19 新增了 use API:它可以在组件渲染中"读取"一个 Promise。
 * 当 Promise 还没完成时,组件会"挂起(suspend)",由外层的
 * <Suspense fallback={...}> 显示加载占位,完成后自动渲染真实内容。
 *
 * 关键点:传给 use 的 Promise 必须是"稳定"的(缓存起来),
 *        否则每次渲染都新建一个 Promise,会导致无限挂起。
 */
import { use, Suspense, useState, startTransition } from 'react'

// 模拟一个网络请求:1 秒后返回一句今日格言。
// 用一个 Map 按 version 缓存 Promise,保证同一 version 拿到的是同一个 Promise。
const cache = new Map()
function fetchQuote(version) {
  if (!cache.has(version)) {
    cache.set(
      version,
      new Promise((resolve) => {
        const quotes = [
          '看一百遍不如自己敲一遍。',
          '组件即函数,数据向下流。',
          '不要直接改 state,永远返回新的。',
          'Suspense 让"加载中"变得优雅。',
        ]
        setTimeout(() => resolve(quotes[version % quotes.length]), 1000)
      })
    )
  }
  return cache.get(version)
}

// 这个子组件用 use 读取 Promise。注意它没有 loading 状态 ——
// "加载中"完全交给外层的 Suspense 处理,组件只管拿到数据后的样子。
function QuoteCard({ version }) {
  const quote = use(fetchQuote(version)) // 👈 React 19 的 use:直接读 Promise
  return <blockquote className="mini-card" style={{ fontSize: 18 }}>“{quote}”</blockquote>
}

export default function UseSuspense() {
  const [version, setVersion] = useState(0)

  const reload = () => {
    // 用 startTransition 包裹,刷新时旧内容不会闪一下,过渡更平滑
    startTransition(() => setVersion((v) => v + 1))
  }

  return (
    <div className="demo-card">
      <h2>每日格言 · use + Suspense</h2>
      <p className="crumb">点"换一句"会请求新数据,加载时下方显示占位骨架。</p>

      {/* Suspense:当内部组件因 use 挂起时,显示 fallback */}
      <Suspense fallback={<div className="mini-card">⏳ 正在加载格言…</div>}>
        <QuoteCard version={version} />
      </Suspense>

      <div className="btn-row">
        <button className="btn-primary" onClick={reload}>
          换一句 →
        </button>
      </div>

      <details className="hint" style={{ marginTop: 12 }}>
        <summary>use 和 useEffect 请求有什么不同?</summary>
        <p>
          过去我们在 useEffect 里发请求、手动维护 loading/error 三种 state。
          use + Suspense 把"加载中"上移到 Suspense、把"出错"交给错误边界,
          组件本身只描述"数据到手后长什么样",代码更聚焦。
          注意:use 不同于其它 Hook,它<b>可以</b>写在 if 里,但传入的 Promise 必须稳定(缓存)。
        </p>
      </details>
    </div>
  )
}
