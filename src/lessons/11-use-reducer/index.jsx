/**
 * 第 11 关 · useReducer:复杂状态逻辑(React 官方推荐)
 * ------------------------------------------------------------
 * 当一个组件有多个 state 互相联动时,useState 会变得难以维护。
 * useReducer 把"所有状态变更"集中到一个 reducer 函数里,
 * 通过 dispatch(action) 来描述"发生了什么",让逻辑更清晰。
 *
 * 口诀:useState 是"设成什么",useReducer 是"发生了什么"。
 */
import { useReducer } from 'react'

// reducer:接收当前 state 和 action,返回新 state
// 把所有状态变更逻辑集中在这一个函数里
function taskReducer(state, action) {
  switch (action.type) {
    case 'added':
      return [...state, { id: Date.now(), text: action.text, done: false }]
    case 'toggled':
      // 👉 TODO 1:用 map 把指定 id 的 done 取反
      // return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t)
      return state
    case 'deleted':
      // 👉 TODO 2:用 filter 删除指定 id
      // return state.filter(t => t.id !== action.id)
      return state
    case 'cleared':
      return state.filter((t) => !t.done)
    default:
      return state
  }
}

const initialTasks = [
  { id: 1, text: '学会 useReducer', done: false },
  { id: 2, text: '理解 action 和 dispatch', done: false },
]

export default function UseReducer() {
  // useReducer(reducer, 初始state)
  // 返回 [当前state, dispatch函数]
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks)

  const handleAdd = (e) => {
    e.preventDefault()
    const input = e.target.elements.text
    if (!input.value.trim()) return
    // dispatch 一个 action:描述"发生了什么"
    dispatch({ type: 'added', text: input.value })
    input.value = ''
  }

  return (
    <div className="demo-card">
      <h2>任务清单 · useReducer</h2>
      <p className="crumb">所有变更都通过 dispatch({'{ type }'}) 触发,逻辑集中在 reducer。</p>

      <form className="todo-input" onSubmit={handleAdd}>
        <input name="text" placeholder="新任务..." />
        <button className="btn-primary" type="submit">添加</button>
      </form>

      <ul className="todo-list">
        {tasks.map((t) => (
          <li key={t.id} className={'todo-item' + (t.done ? ' done' : '')}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => dispatch({ type: 'toggled', id: t.id })}
            />
            <span className="txt">{t.text}</span>
            <button className="del" onClick={() => dispatch({ type: 'deleted', id: t.id })}>
              删除
            </button>
          </li>
        ))}
      </ul>

      <div className="btn-row">
        <span className="todo-count">
          剩余 {tasks.filter((t) => !t.done).length} 项
        </span>
        <button onClick={() => dispatch({ type: 'cleared' })}>清除已完成</button>
      </div>

      <details className="hint" style={{ marginTop: 12 }}>
        <summary>useState vs useReducer 怎么选?</summary>
        <p>
          状态简单(1-2 个独立值)用 useState。<br />
          状态复杂(多个联动值、下一个状态依赖前一个)用 useReducer。<br />
          useReducer 的好处:逻辑集中、易测试、方便用 Context 共享 dispatch。
        </p>
      </details>
    </div>
  )
}
