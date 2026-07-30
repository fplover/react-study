/**
 * 第 18 关 · Actions + useOptimistic(React 19 新特性)
 * ------------------------------------------------------------
 * 合并演示两个 React 19 表单新特性:
 *   - useActionState + useFormStatus:Action 表单,自动托管提交状态
 *   - useOptimistic:乐观更新,操作后先显示、失败自动回滚
 */
import { useActionState, useOptimistic, useState } from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button className="btn-primary" type="submit" disabled={pending}>
      {pending ? '发送中...' : '发送'}
    </button>
  )
}

export default function ActionsOptimistic() {
  const [messages, setMessages] = useState([
    { id: 1, text: '欢迎来到聊天室', sending: false },
  ])

  // 乐观更新:发送时先显示"发送中"的临时消息
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (current, newText) => [...current, { id: 'temp', text: newText, sending: true }]
  )

  // Action:先乐观显示,再模拟网络请求,最后写入真实数据
  const [state, formAction] = useActionState(
    async (prev, formData) => {
      const text = (formData.get('msg') || '').toString().trim()
      if (!text) return { error: '内容不能为空' }
      addOptimistic(text) // 立刻乐观显示
      await new Promise((r) => setTimeout(r, 1000)) // 模拟网络
      setMessages((m) => [...m, { id: Date.now(), text, sending: false }])
      return { error: null }
    },
    { error: null }
  )

  return (
    <div className="demo-card">
      <h2>聊天室 · Actions + 乐观更新</h2>
      <p className="crumb">发送后消息立刻出现(半透明=发送中),1 秒后确认。</p>

      <div className="mini-card" style={{ minHeight: 120 }}>
        {optimisticMessages.map((m) => (
          <div key={m.id} className="todo-item" style={{ opacity: m.sending ? 0.5 : 1 }}>
            <span className="txt">{m.text}</span>
            {m.sending && <span className="count">发送中...</span>}
          </div>
        ))}
      </div>

      <form className="todo-input" action={formAction} style={{ marginTop: 12 }}>
        <input name="msg" placeholder="说点什么..." autoComplete="off" />
        <SubmitButton />
      </form>

      {state.error && <p className="error">{state.error}</p>}

      <details className="hint" style={{ marginTop: 12 }}>
        <summary>这两个 Hook 怎么配合?</summary>
        <p>
          <b>useActionState</b> 管理表单提交的 action 和返回状态;<br />
          <b>useOptimistic</b> 在 action 执行期间显示"乐观"的临时数据;<br />
          如果 action 抛错,乐观值自动丢弃,无需手动回滚。
        </p>
      </details>
    </div>
  )
}
