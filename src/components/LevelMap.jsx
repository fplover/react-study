import { lessons, tierMeta } from '../lessons/index.js'

/**
 * 首页:关卡地图。展示全部关卡卡片 + 总进度条。
 * 点击卡片通过 onOpen(id) 通知 App 切换到详情页。
 */
export default function LevelMap({ progress, onOpen }) {
  const total = lessons.length
  const doneCount = lessons.filter((l) => progress.state.done[l.id]).length
  const percent = Math.round((doneCount / total) * 100)

  return (
    <div>
      <header className="hero">
        <div className="eyebrow">React Step Lab · 循序渐进</div>
        <h1>
          React <span className="hl">闯关</span>实验室
        </h1>
        <p>
          20 个由浅入深的关卡,对标 React 官方文档,从 JSX 一路练到 React 19 新特性。每一关都有:任务清单、
          可运行的练习代码、参考答案和知识要点。改动源码后页面会热更新,
          完成任务就"盖章过关"。你的进度会自动保存在浏览器里。
        </p>

        <div className="meter-wrap">
          <div className="meter">
            <div className="meter-fill" style={{ width: percent + '%' }} />
          </div>
          <span className="meter-label">
            {doneCount}/{total} 关 · {percent}%
          </span>
        </div>
        <div className="stat-row">
          <span className="stat">
            已过关 <b>{doneCount}</b> 关
          </span>
          <span className="stat">
            剩余 <b>{total - doneCount}</b> 关
          </span>
          <span className="stat">
            {percent === 100 ? '🎓 全部通关,你毕业啦!' : '继续加油 💪'}
          </span>
          {doneCount > 0 && (
            <button className="btn-ghost" onClick={progress.reset}>
              重置进度
            </button>
          )}
        </div>
      </header>

      <div className="level-grid">
        {lessons.map((l, i) => {
          const meta = tierMeta[l.tier]
          const done = progress.state.done[l.id]
          return (
            <div
              key={l.id}
              className="level-card"
              tabIndex={0}
              role="button"
              onClick={() => onOpen(l.id)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(l.id)}
            >
              <span className="no">{String(i + 1).padStart(2, '0')}</span>
              {done && <span className="stamp">已过关</span>}
              <span className={`chip ${meta.className}`}>{meta.label}</span>
              <h3>{l.title}</h3>
              <p className="sub">{l.subtitle}</p>
              <div className="foot">
                <span>{l.tasks.length} 个任务</span>
                <span className="go">开始 →</span>
              </div>
            </div>
          )
        })}
      </div>

      <p className="map-footer">
        建议按顺序闯关 · 源码在 <code>src/lessons/</code> · 边改边看效果
      </p>
    </div>
  )
}
