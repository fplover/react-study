/**
 * 第 14 关 · useOptimistic 乐观更新(React 19 新特性)
 * ------------------------------------------------------------
 * "乐观更新":用户操作后,先假设会成功、立刻更新 UI,
 * 等真实请求返回再确认。体验上"零延迟",很跟手。
 *
 * useOptimistic(真实值, 更新函数) 返回一个"乐观值"。
 * 在 action 进行期间读到的是乐观值,action 结束后自动回落到真实值。
 */
import { useOptimistic, useState, useRef } from 'react'

export default function Optimistic() {
  const [messages, setMessages] = useState([
    { id: 1, text: '欢迎来到聊天室 👋', sending: false },
  ])

  // optimisticMessages:在发送过程中会额外包含"发送中"的临时消息
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (current, newText) => [
      ...current,
      { id: 'temp', text: newText, sending: true }, // 临时的乐观消息
    ]
  )

  const inputRef = useRef(null)

  // 表单 action:先乐观显示,再"发送",最后写入真实状态
  const send = async (formData) => {
    const text = (formData.get('msg') || '').toString().trim()
    if (!text) return
    addOptimistic(text) // 👈 立刻乐观显示"发送中"
    if (inputRef.current) inputRef.current.value = ''
    await new Promise((r) => setTimeout(r, 1000)) // 模拟网络往返
    setMessages((prev) => [...prev, { id: Date.now(), text, sending: false }])
  }

  return (
    <div className="demo-card">
      <h2>聊天室 · 乐观更新</h2>
      <p className="crumb">发送后消息立刻出现(标注"发送中"),1 秒后确认。</p>

      <div className="mini-card" style={{ minHeight: 120 }}>
        {optimisticMessages.map((m) => (
          <div key={m.id} className="todo-item" style={{ opacity: m.sending ? 0.5 : 1 }}>
            <span className="txt">{m.text}</span>
            {m.sending && <span className="count">发送中…</span>}
          </div>
        ))}
      </div>

      <form className="todo-input" action={send} style={{ marginTop: 12 }}>
        <input ref={inputRef} name="msg" placeholder="说点什么…" autoComplete="off" />
        <button className="btn-primary" type="submit">
          发送
        </button>
      </form>

      <details className="hint" style={{ marginTop: 12 }}>
        <summary>乐观更新失败了怎么办?</summary>
        <p>
          如果 action 抛错(请求失败),React 会自动丢弃乐观值、回落到真实状态,
          那条"发送中"的临时消息就会消失 —— 你无需手动回滚。
          这让"先响应、后确认"的交互写起来非常省心。
        </p>
      </details>
    </div>
  )
}
