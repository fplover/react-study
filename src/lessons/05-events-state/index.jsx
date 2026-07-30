/**
 * 第 03 关 · State 与事件
 * ------------------------------------------------------------
 * 目标:用 useState 记住计数,用事件处理函数修改它。
 */
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  const increase = () => setCount((prev) => prev + 1)
  // 👉 TODO 1:实现 decrease,点击让 count - 1
  // 👉 TODO 2:实现 reset,把 count 归零

  return (
    <div className="demo-card">
      <h2>计数器</h2>

      {/* 👉 TODO 3:当 count < 0 时让数字变红
          提示:className={count < 0 ? 'big-number error' : 'big-number'} */}
      <div className="big-number">{count}</div>

      <div className="btn-row" style={{ justifyContent: 'center' }}>
        <button onClick={() => setCount(count - 1)}>− 减一(占位,请改用 decrease)</button>
        <button className="btn-primary" onClick={increase}>+ 加一</button>
        <button>归零</button>
      </div>

      <p className="crumb" style={{ textAlign: 'center' }}>
        注意 onClick 传的是函数本身,而不是 increase()。
      </p>

      {/* ------------------------------------------------------------
          参考答案:
          const decrease = () => setCount((p) => p - 1)
          const reset = () => setCount(0)
          <div className={count < 0 ? 'big-number error' : 'big-number'}>{count}</div>
          <button onClick={decrease}>− 减一</button>
          <button onClick={reset}>归零</button>
         ------------------------------------------------------------ */}
    </div>
  )
}
