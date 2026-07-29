/**
 * 第 05 关 · 列表渲染与 key
 * ------------------------------------------------------------
 * 目标:用 map 渲染数组,理解 key,再加一个实时搜索框。
 */
import { useState } from 'react'

const FRUITS = [
  { id: 'a', name: '苹果', price: 5 },
  { id: 'b', name: '香蕉', price: 3 },
  { id: 'c', name: '橙子', price: 4 },
  { id: 'd', name: '葡萄', price: 12 },
  { id: 'e', name: '西瓜', price: 20 },
]

export default function ListsKeys() {
  const [keyword, setKeyword] = useState('')

  // 👉 TODO 3:根据 keyword 过滤(name 包含关键字)
  // const shown = FRUITS.filter((f) => f.name.includes(keyword))
  const shown = FRUITS

  return (
    <div className="demo-card">
      <h2>水果价目表</h2>

      {/* 👉 TODO 3:把输入框变成受控,输入时更新 keyword */}
      <input className="search" placeholder="🔍 搜索水果…" />

      <p className="count">共 {shown.length} 种</p>

      {/* 👉 TODO 1 & 2:用 map 渲染 shown,每个 li 加 key={f.id} */}
      <ul className="fruit-list">
        <li>把这里替换成 shown.map(...) 的结果</li>
      </ul>

      {/* ------------------------------------------------------------
          参考答案:
          <input className="search" value={keyword}
                 onChange={(e) => setKeyword(e.target.value)} placeholder="🔍 搜索水果…" />
          const shown = FRUITS.filter((f) => f.name.includes(keyword))
          <ul className="fruit-list">
            {shown.map((f) => (
              <li key={f.id}><span>{f.name}</span><b>¥{f.price}</b></li>
            ))}
          </ul>
         ------------------------------------------------------------ */}
    </div>
  )
}
