/**
 * 第 06 关 · 受控表单
 * ------------------------------------------------------------
 * 目标:让 state 成为输入框的唯一真相来源,并做提交校验。
 */
import { useState } from 'react'

export default function Forms() {
  const [name, setName] = useState('')
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault() // 阻止表单默认的刷新页面行为
    // 👉 TODO 2:校验 —— 名字不能为空、必须勾选同意
    // if (!name.trim()) return setError('请填写名字')
    // if (!agree) return setError('请先勾选同意条款')
    setError('')
    setSubmitted({ name }) // 👉 TODO 3:提交成功,记录汇总
  }

  if (submitted) {
    return (
      <div className="demo-card">
        <div className="success-card">
          <h3>✅ 报名成功!</h3>
          <p>欢迎你,{submitted.name}!</p>
          <button onClick={() => setSubmitted(null)}>再填一次</button>
        </div>
      </div>
    )
  }

  return (
    <div className="demo-card">
      <h2>活动报名表</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          你的名字
          {/* 👉 TODO 1:变成受控组件 value={name} onChange={...} */}
          <input type="text" placeholder="请输入名字" />
          {error && <span className="err">{error}</span>}
        </label>

        <label className="agree">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          我已阅读并同意活动条款
        </label>

        <button className="btn-primary" type="submit">
          提交报名
        </button>
      </form>

      {/* ------------------------------------------------------------
          参考答案:
          <input type="text" value={name}
                 onChange={(e) => setName(e.target.value)} placeholder="请输入名字" />
          handleSubmit 里:
            if (!name.trim()) return setError('请填写名字')
            if (!agree) return setError('请先勾选同意条款')
            setError(''); setSubmitted({ name })
         ------------------------------------------------------------ */}
    </div>
  )
}
