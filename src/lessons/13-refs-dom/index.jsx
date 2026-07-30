/**
 * 第 13 关 · Ref 与 DOM(React 官方"逃生舱"之一)
 * ------------------------------------------------------------
 * useRef 两种用途:
 *   1. 引用一个"不触发重新渲染"的值(如计时器 id)
 *   2. 直接操作 DOM 节点(聚焦、滚动、测量尺寸)
 * React 19 新增:ref 可以直接作为 prop 传给函数组件,不再需要 forwardRef。
 */
import { useRef, useState } from 'react'

// React 19:ref 直接从 props 解构,告别 forwardRef!
function AutoFocusInput({ ref, placeholder }) {
  return <input ref={ref} placeholder={placeholder} />
}

export default function RefsDom() {
  const inputRef = useRef(null)
  const [text, setText] = useState('')
  const [size, setSize] = useState('')

  const focusInput = () => inputRef.current?.focus()

  // 👉 TODO:用 ref 测量输入框的尺寸
  const measure = () => {
    const el = inputRef.current
    if (el) {
      setSize(el.offsetWidth + ' x ' + el.offsetHeight + ' px')
    }
  }

  // 用 ref 存"不需要渲染"的值:上次输入时间
  const lastTypeRef = useRef(null)
  const handleChange = (e) => {
    lastTypeRef.current = Date.now()
    setText(e.target.value)
  }

  return (
    <div className="demo-card">
      <h2>Ref 与 DOM 🔧</h2>

      <div className="mini-card">
        <h3>① ref 操作 DOM:聚焦 + 测量</h3>
        <AutoFocusInput ref={inputRef} placeholder="点下方按钮聚焦我" />
        <div className="btn-row">
          <button className="btn-primary" onClick={focusInput}>聚焦输入框</button>
          <button onClick={measure}>测量尺寸</button>
          {size && <span className="count">{size}</span>}
        </div>
      </div>

      <div className="mini-card">
        <h3>② ref 存"不渲染"的值</h3>
        <input value={text} onChange={handleChange} placeholder="打字时记录时间戳" />
        <p className="count">
          上次输入时间戳:{lastTypeRef.current || '(还没输入)'}
          <br />注意:这个值变化时<b>不会</b>触发重新渲染(这就是 ref 的特点)。
        </p>
      </div>

      <div className="mini-card">
        <h3>③ React 19:ref 作为 prop</h3>
        <p className="count">
          上面的 AutoFocusInput 直接从 props 解构 ref,不用 forwardRef 包一层。
          在 React 18 里这会报警告,19 里是官方推荐写法。
        </p>
      </div>
    </div>
  )
}
