/**
 * 第 09 关 · 自定义 Hook
 * ------------------------------------------------------------
 * 目标:把"读写 localStorage"的逻辑抽成 useLocalStorage,
 *      让备忘录刷新页面后依然记得。
 */
import { useState, useEffect } from 'react'

// 👉 这就是你的自定义 Hook。它复用的是"逻辑",不是 UI。
// 已经帮你写好一版,读懂它,然后在下面用它。
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  // value 变化时写回 localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] // 用法和 useState 一模一样
}

export default function CustomHooks() {
  // 👉 TODO:用 useLocalStorage 替换下面这行普通 useState,
  //         然后写点字、刷新页面,看看还在不在。
  const [note, setNote] = useLocalStorage('react-lab-note', '')

  return (
    <div className="demo-card">
      <h2>持久化备忘录 📝</h2>
      <p className="crumb">在下面写点东西,然后刷新浏览器 —— 内容不会丢!</p>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={5}
        style={{
          width: '100%',
          padding: 12,
          border: '1.5px solid var(--ink)',
          borderRadius: 8,
          fontFamily: 'inherit',
          fontSize: 14,
        }}
        placeholder="随手记点什么…"
      />
      <div className="btn-row">
        <span className="count">已自动保存 · {note.length} 字</span>
        <button onClick={() => setNote('')}>清空</button>
      </div>

      {/* 思考题:如果再做一个"主题开关",是不是也能用同一个 useLocalStorage?
          这就是自定义 Hook 的威力 —— 逻辑复用。 */}
    </div>
  )
}
