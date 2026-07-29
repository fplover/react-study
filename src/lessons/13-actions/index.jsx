/**
 * 第 13 关 · Actions 与 useActionState(React 19 新特性)
 * ------------------------------------------------------------
 * React 19 让 <form> 的 action 可以直接接收一个"函数"(Action)。
 * 配合两个新 Hook:
 *   - useActionState:管理 action 的返回状态 + 自动的 pending 状态
 *   - useFormStatus :子组件不用传 props 就能读到"表单是否提交中"
 *
 * 好处:不用再手写 onSubmit + e.preventDefault + loading state,
 *      表单提交的样板代码大幅减少。
 */
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

// 提交按钮:用 useFormStatus 自动感知所在 <form> 的提交状态。
// 注意它必须放在 <form> 内部,且是独立子组件才能读到状态。
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button className="btn-primary" type="submit" disabled={pending}>
      {pending ? '提交中…' : '许愿 🌠'}
    </button>
  )
}

export default function Actions() {
  // useActionState(action, 初始状态)
  // action 收到 (上一次的状态, 表单 FormData),返回新状态。
  const [state, formAction] = useActionState(
    async (prevState, formData) => {
      const wish = (formData.get('wish') || '').toString().trim()
      // 模拟网络延迟,让你看到 pending 效果
      await new Promise((r) => setTimeout(r, 900))
      if (!wish) {
        return { ok: false, message: '愿望不能为空哦', count: prevState.count }
      }
      return { ok: true, message: `已记下第 ${prevState.count + 1} 个愿望:${wish}`, count: prevState.count + 1 }
    },
    { ok: true, message: '', count: 0 } // 初始状态
  )

  return (
    <div className="demo-card">
      <h2>许愿池 · Actions 表单</h2>
      <p className="crumb">直接把函数交给 form 的 action,提交状态由 React 托管。</p>

      {/* action 传函数,提交时 React 自动收集 FormData 调用它 */}
      <form className="form" action={formAction}>
        <label>
          你的愿望
          <input type="text" name="wish" placeholder="例如:学会 React 19" />
        </label>
        <SubmitButton />
      </form>

      {state.message && (
        <div className={`mini-card ${state.ok ? '' : ''}`} style={{ marginTop: 12 }}>
          {state.ok ? '✅ ' : '⚠️ '}
          <span className={state.ok ? '' : 'error'}>{state.message}</span>
        </div>
      )}

      <details className="hint" style={{ marginTop: 12 }}>
        <summary>和第 06 关的受控表单比,省了什么?</summary>
        <p>
          不用 useState 存每个输入值、不用 onSubmit + preventDefault、
          不用手写 loading 布尔值。表单数据通过 name 由 FormData 自动收集,
          pending 由 useActionState / useFormStatus 自动提供。
          适合"提交型"表单;需要实时联动校验时,受控组件仍然好用。
        </p>
      </details>
    </div>
  )
}
