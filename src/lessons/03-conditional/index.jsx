/**
 * 第 04 关 · 条件渲染
 * ------------------------------------------------------------
 * 目标:用三元、&& 和提前 return 控制界面显示。
 */
import { useState } from 'react'

export default function Conditional() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [unread, setUnread] = useState(0)

  return (
    <div className="demo-card">
      <h2>消息中心</h2>

      <div className="mini-card">
        <h3>① 登录状态(三元)</h3>
        {/* 👉 TODO 1:loggedIn 为 true 显示"欢迎回来 🎉",否则显示"请先登录" */}
        <p>这里显示登录状态</p>
        <button onClick={() => setLoggedIn((v) => !v)}>
          {loggedIn ? '退出登录' : '登录'}
        </button>
      </div>

      <div className="mini-card">
        <h3>② 未读小红点(&&)</h3>
        <p>
          收件箱
          {/* 👉 TODO 2 & 3:用 && 实现"有未读才显示红点和数字"
              小心:写成 {unread && ...} 在 unread 为 0 时会渲染出 0,
              要写成 {unread > 0 && ...} */}
          <span className="secret" style={{ marginLeft: 8 }}>红点占位</span>
        </p>
        <div className="btn-row">
          <button onClick={() => setUnread((n) => n + 1)}>收到新消息 +1</button>
          <button onClick={() => setUnread(0)}>全部已读</button>
        </div>
      </div>

      {/* ------------------------------------------------------------
          参考答案:
          ① {loggedIn ? <p>欢迎回来 🎉</p> : <p>请先登录</p>}
          ②③ 收件箱 {unread > 0 && <span className="secret">🔴 {unread}</span>}
         ------------------------------------------------------------ */}
    </div>
  )
}
