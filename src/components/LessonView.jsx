import { useState } from 'react'
import { lessons, tierMeta } from '../lessons/index.js'
import { rawSources } from '../lessons/rawSources.js'
import ErrorBoundary from './ErrorBoundary.jsx'
import LiveSandbox from './LiveSandbox.jsx'

/**
 * 关卡详情页。左边是"练习舞台"(可在页面上改代码并实时运行),
 * 右边是任务清单 / 知识要点 / 提示。
 */
export default function LessonView({ id, progress, onBack, onNav }) {
  const index = lessons.findIndex((l) => l.id === id)
  const lesson = lessons[index]
  const meta = tierMeta[lesson.tier]
  const [tab, setTab] = useState('demo') // demo | tasks | notes
  const [live, setLive] = useState(true) // true=页面编辑 false=只读运行

  const prev = lessons[index - 1]
  const next = lessons[index + 1]
  const doneMap = progress.state.tasks[id] || {}
  const done = !!progress.state.done[id]
  const Demo = lesson.Component
  const source = rawSources[id]

  return (
    <div>
      <div className="lv-topbar">
        <button className="btn-ghost" onClick={onBack}>
          ← 关卡地图
        </button>
        <span className={`chip ${meta.className}`}>{meta.label}</span>
        <span className="crumb">
          第 {String(index + 1).padStart(2, '0')} / {lessons.length} 关
        </span>
        <h2>{lesson.title}</h2>
        {done && <span className="chip intro">✓ 已过关</span>}
      </div>

      <div className="lv-layout">
        {/* 左:练习舞台 */}
        <section className="panel">
          <div className="panel-head">
            <span className="title">
              <span className="dots">
                <i /><i /><i />
              </span>
              练习舞台
            </span>
            <div className="seg">
              <button className={live ? 'on' : ''} onClick={() => setLive(true)}>
                ✏️ 页面编辑
              </button>
              <button className={!live ? 'on' : ''} onClick={() => setLive(false)}>
                ▶️ 只读运行
              </button>
            </div>
          </div>
          <div className="panel-body">
            {live && source ? (
              <LiveSandbox key={id} lessonId={id} initialCode={source} />
            ) : (
              <ErrorBoundary key={id}>
                <Demo />
              </ErrorBoundary>
            )}
          </div>
        </section>

        {/* 右:任务 / 要点 */}
        <aside>
          <div className="panel">
            <div className="panel-head">
              <span className="title">闯关手册</span>
              <div className="seg">
                <button className={tab === 'tasks' ? 'on' : ''} onClick={() => setTab('tasks')}>
                  任务
                </button>
                <button className={tab === 'notes' ? 'on' : ''} onClick={() => setTab('notes')}>
                  要点
                </button>
              </div>
            </div>
            <div className="panel-body">
              {tab !== 'notes' ? (
                <>
                  <p className="crumb" style={{ marginTop: 0 }}>
                    打开 <code>index.jsx</code> 完成下面的任务,勾选记录进度:
                  </p>
                  <ul className="task-list">
                    {lesson.tasks.map((t, i) => {
                      const checked = !!doneMap[i]
                      return (
                        <li
                          key={i}
                          className={`task-item ${checked ? 'done' : ''}`}
                          onClick={() => progress.toggleTask(id, i)}
                        >
                          <span className="box">{checked ? '✓' : ''}</span>
                          <span className="txt">{t}</span>
                        </li>
                      )
                    })}
                  </ul>

                  <details className="hint" style={{ marginTop: 14 }}>
                    <summary>卡住了?看提示</summary>
                    <p>{lesson.hint}</p>
                  </details>

                  <div className="done-actions" style={{ marginTop: 16 }}>
                    <button
                      className={done ? '' : 'btn-primary'}
                      onClick={() => progress.setLessonDone(id, !done)}
                    >
                      {done ? '取消过关标记' : '🏅 盖章:我过关了'}
                    </button>
                    {done && <span className="done-note">干得漂亮!</span>}
                  </div>
                </>
              ) : (
                <>
                  <ul className="points" dangerouslySetInnerHTML={{ __html: lesson.points.map((p) => `<li>${p}</li>`).join('') }} />
                </>
              )}
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <span className="title">继续闯关</span>
            </div>
            <div className="panel-body done-actions">
              <button disabled={!prev} onClick={() => prev && onNav(prev.id)}>
                ← 上一关
              </button>
              <button className="btn-primary" disabled={!next} onClick={() => next && onNav(next.id)}>
                下一关 →
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
