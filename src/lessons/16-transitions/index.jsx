/**
 * 第 16 关 · useTransition + useDeferredValue(并发渲染)
 * ------------------------------------------------------------
 * 场景:一个上万条数据的列表 + 实时搜索框。
 * 如果每次输入都同步重渲染整张大列表,输入框会明显卡顿。
 * React 的并发特性能把"重渲染大列表"标记为低优先级,
 * 让输入框(高优先级)始终跟手。
 *
 * 两种做法:
 *   - useTransition:手动把"慢更新"包进 startTransition
 *   - useDeferredValue:给一个值一个"延迟版",让派生的慢渲染用它
 */
import { useState, useTransition, useDeferredValue, useMemo } from 'react'

// 造一批数据(2 万条),模拟"大列表"
const BIG_LIST = Array.from({ length: 20000 }, (_, i) => `条目 #${i + 1} · item-${i + 1}`)

// 故意让每次过滤"有点重",放大卡顿效果,方便你感受差异
function filterList(keyword) {
  const kw = keyword.toLowerCase()
  const result = []
  for (const item of BIG_LIST) {
    // 人为增加一点计算量
    if (item.toLowerCase().includes(kw)) result.push(item)
  }
  return result
}

// ① 用 useDeferredValue 的版本
function DeferredDemo() {
  const [text, setText] = useState('')
  const deferredText = useDeferredValue(text) // 👈 text 的"延迟版"
  const isStale = text !== deferredText // 延迟值还没追上 = 正在后台重算

  // 用延迟值来做重计算,so 输入(text)先响应,列表(deferredText)后追上
  const list = useMemo(() => filterList(deferredText), [deferredText])

  return (
    <div className="mini-card">
      <h3>① useDeferredValue</h3>
      <input
        className="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入试试,比如 999"
      />
      <p className="count">
        匹配 {list.length} 条{isStale && ' · 列表更新中…'}
      </p>
      <ul className="fruit-list" style={{ maxHeight: 160, overflow: 'auto', opacity: isStale ? 0.5 : 1 }}>
        {list.slice(0, 100).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

// ② 用 useTransition 的版本
function TransitionDemo() {
  const [text, setText] = useState('')
  const [list, setList] = useState(BIG_LIST)
  const [isPending, startTransition] = useTransition() // 👈

  const onChange = (e) => {
    const value = e.target.value
    setText(value) // 高优先级:输入框立刻更新
    // 低优先级:把"重算大列表"包进 transition,不阻塞输入
    startTransition(() => {
      setList(filterList(value))
    })
  }

  return (
    <div className="mini-card">
      <h3>② useTransition</h3>
      <input className="search" value={text} onChange={onChange} placeholder="输入试试,比如 12345" />
      <p className="count">
        匹配 {list.length} 条{isPending && ' · 后台计算中…'}
      </p>
      <ul className="fruit-list" style={{ maxHeight: 160, overflow: 'auto', opacity: isPending ? 0.5 : 1 }}>
        {list.slice(0, 100).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Transitions() {
  return (
    <div className="demo-card" style={{ maxWidth: 720 }}>
      <h2>并发渲染 · 2 万条数据实时搜索</h2>
      <p className="crumb">
        两个框都在过滤 2 万条数据。得益于并发特性,输入始终跟手,
        重活儿在后台低优先级完成(列表半透明 = 正在追赶)。
      </p>

      <DeferredDemo />
      <TransitionDemo />

      <details className="hint" style={{ marginTop: 12 }}>
        <summary>两者怎么选?</summary>
        <p>
          <b>useTransition</b>:你能拿到触发更新的代码(如自己调用 setState),
          用 startTransition 主动把它降级,还能读 isPending 显示加载态。<br />
          <b>useDeferredValue</b>:你只拿得到"值"(如来自 props),给它一个延迟副本,
          让基于它的昂贵渲染滞后一步。<br />
          共同点:都不是"变快",而是<b>不阻塞</b>高优先级更新(如打字),体验更顺滑。
          React 19 里 useDeferredValue 还支持传第二个参数作为初始值。
        </p>
      </details>
    </div>
  )
}
