/**
 * 第 10 关 · State 的保留与重置(React 官方核心概念)
 * ------------------------------------------------------------
 * React 靠组件在树中的"位置"来决定保留还是丢弃 state。
 * 同一位置同一组件 -> state 保留;不同 key -> state 重置。
 * 用 key={id} 可以强制"重置"一个表单/组件。
 */
import { useState } from 'react'

function Counter({ label }) {
  const [n, setN] = useState(0)
  return (
    <div className="mini-card">
      <h3>{label}</h3>
      <div className="big-number small">{n}</div>
      <button className="btn-primary" onClick={() => setN(n + 1)}>+1</button>
    </div>
  )
}

export default function PreserveReset() {
  const [tab, setTab] = useState('a')
  const [userId, setUserId] = useState(1)
  const [forceKey, setForceKey] = useState(0)

  return (
    <div className="demo-card">
      <h2>State 的保留与重置 🔄</h2>

      <div className="mini-card">
        <h3>① 同位置同组件 — state 保留</h3>
        <p className="count">切换标签,计数器不归零(state 被保留)。</p>
        <div className="seg">
          <button className={tab === 'a' ? 'on' : ''} onClick={() => setTab('a')}>标签 A</button>
          <button className={tab === 'b' ? 'on' : ''} onClick={() => setTab('b')}>标签 B</button>
        </div>
        <div style={{ marginTop: 10 }}>
          {tab === 'a' ? <Counter label="标签 A 的计数器" /> : <Counter label="标签 B 的计数器" />}
        </div>
      </div>

      <div className="mini-card">
        <h3>② 不同 key - state 重置</h3>
        <p className="count">切换用户,用 key 强制重置计数器。</p>
        <div className="seg">
          <button className={userId === 1 ? 'on' : ''} onClick={() => setUserId(1)}>用户 1</button>
          <button className={userId === 2 ? 'on' : ''} onClick={() => setUserId(2)}>用户 2</button>
          <button className={userId === 3 ? 'on' : ''} onClick={() => setUserId(3)}>用户 3</button>
        </div>
        <div style={{ marginTop: 10 }}>
          <Counter key={userId} label={'用户 ' + userId + ' (已重置)'} />
        </div>
      </div>

      <div className="mini-card">
        <h3>③ 手动用 key 强制重置</h3>
        <p className="count">点"强制重置"会改变 key,计数器归零。</p>
        <div style={{ marginTop: 10 }}>
          <Counter key={forceKey} label={'实例 #' + forceKey} />
        </div>
        <button style={{ marginTop: 8 }} onClick={() => setForceKey((k) => k + 1)}>
          强制重置(key + 1)
        </button>
      </div>
    </div>
  )
}
