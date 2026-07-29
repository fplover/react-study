/**
 * 第 08 关 · useEffect 副作用
 * ------------------------------------------------------------
 * 目标:用 useEffect + setInterval 做计时器,并正确清理。
 * 特别体验:开发环境 StrictMode 会让 effect 跑两次,
 *          如果不清理,你会看到计时器"跳得飞快"(两个叠加)。
 */
import { useState, useEffect } from 'react'

export default function Effects() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return

    // 👉 TODO 1:开一个每秒 +1 的定时器
    const id = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)

    // 👉 TODO 2:返回清理函数,组件卸载 / running 变化前清掉定时器
    // 试着先删掉下面这行,观察 StrictMode 下计时会不会变成两倍速!
    return () => clearInterval(id)
  }, [running]) // 依赖数组:running 变化时,先清理再重建

  return (
    <div className="demo-card">
      <h2>秒表 ⏱️</h2>
      <div className="big-number small">{seconds}s</div>

      <div className="btn-row" style={{ justifyContent: 'center' }}>
        <button className="btn-primary" onClick={() => setRunning((r) => !r)}>
          {running ? '暂停' : '继续'}
        </button>
        <button onClick={() => setSeconds(0)}>清零</button>
      </div>

      <details className="hint" style={{ marginTop: 12 }}>
        <summary>为什么要清理?</summary>
        <p>
          每次 effect 重新执行前(或组件卸载时)都会先跑清理函数。
          不清理的话,旧的 setInterval 会一直存在,越积越多 —— 这就是内存泄漏。
          StrictMode 故意"挂载→卸载→再挂载"就是为了帮你在开发期暴露这个问题。
        </p>
      </details>
    </div>
  )
}
