/**
 * 第 06 关 · State 是快照(React 官方核心概念)
 * ------------------------------------------------------------
 * React 的 state 不是"变量",而是"一次渲染的快照"。
 * 调用 setN 后,state 不会立即变 -- 当前这次渲染里 n 还是旧值,
 * 要等下一次渲染才会看到新值。这是 React 最反直觉、也最重要的概念之一。
 */
import { useState } from 'react'

export default function StateSnapshot() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
    // 👉 TODO 1:猜一猜,这行会打印什么?是 0 还是 1?
    // 答案:还是 0!因为 count 是"这次渲染的快照",setCount 不会改变当前 count。
    console.log('点击后 count =', count)

    // 👉 TODO 2:连续调用三次 setCount(count + 1),最终 count 变成多少?
    // 答案:只 +1!因为三次读到的都是同一个旧快照 count。
    // 修正:用函数式更新 setCount(c => c + 1),每次拿到最新的待更新值。
  }

  const handleCorrect = () => {
    // 👉 TODO 3:用函数式更新,点一次 +3
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    setCount((c) => c + 1)
  }

  return (
    <div className="demo-card">
      <h2>State 是快照 📸</h2>
      <div className="big-number">{count}</div>

      <div className="btn-row" style={{ justifyContent: 'center' }}>
        <button className="btn-primary" onClick={handleClick}>+1(看控制台)</button>
        <button onClick={handleCorrect}>函数式 +3</button>
        <button onClick={() => setCount(0)}>归零</button>
      </div>

      <div className="mini-card">
        <h3>关键认知</h3>
        <p>点 "+1" 后,页面数字变了,但 console.log 打印的还是<b>旧值</b> --
          因为在这次渲染里 <code>count</code> 是一个固定的快照。</p>
        <p className="count">打开浏览器控制台(F12)亲眼确认!</p>
      </div>
    </div>
  )
}
