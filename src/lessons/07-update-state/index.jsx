/**
 * 第 07 关 · 更新对象与数组 in State(不可变性)
 * ------------------------------------------------------------
 * React 要求 state 不可变:不能直接修改,必须创建副本再传给 setState。
 * React 靠"引用是否变了"来判断要不要重新渲染。
 */
import { useState } from 'react'

export default function UpdateState() {
  const [user, setUser] = useState({ name: '小满', age: 18, city: '杭州' })
  const [hobbies, setHobbies] = useState(['写代码', '滑板'])

  // ❌ 错误:直接修改对象(React 不会检测到变化!)
  const wrongUpdate = () => {
    user.age = 20
    setUser(user)
  }

  // ✅ 正确:用展开运算符创建新对象
  const correctUpdate = () => {
    setUser({ ...user, age: 20 })
  }

  // 👉 TODO 1:实现"长一岁"--基于旧 age 加 1
  const growOlder = () => {
    // setUser({ ...user, age: ??? })
  }

  // 👉 TODO 2:用 [...hobbies, '读书'] 添加
  const addHobby = () => {
    // setHobbies(???)
  }

  // 👉 TODO 3:用 filter 删除指定下标
  const removeHobby = (index) => {
    // setHobbies(???)
  }

  return (
    <div className="demo-card">
      <h2>不可变更新 🔒</h2>

      <div className="mini-card">
        <h3>对象更新</h3>
        <p>姓名:<b>{user.name}</b> · 年龄:<b>{user.age}</b> · 城市:<b>{user.city}</b></p>
        <div className="btn-row">
          <button onClick={wrongUpdate}>❌ 直接改(没反应)</button>
          <button className="btn-primary" onClick={correctUpdate}>✅ 副本:年龄变20</button>
          <button onClick={growOlder}>TODO: 长一岁</button>
        </div>
      </div>

      <div className="mini-card">
        <h3>数组更新</h3>
        <ul className="todo-list">
          {hobbies.map((h, i) => (
            <li key={i} className="todo-item">
              <span className="txt">{h}</span>
              <button className="del" onClick={() => removeHobby(i)}>删除</button>
            </li>
          ))}
        </ul>
        <button className="btn-primary" onClick={addHobby}>TODO: 添加"读书"</button>
      </div>
    </div>
  )
}
