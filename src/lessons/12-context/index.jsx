/**
 * 第 10 关 · Context 跨层传递
 * ------------------------------------------------------------
 * 目标:用 createContext + useContext 让主题状态全局可用,
 *       避免 props 一层层手动传递。
 */
import { createContext, useContext, useState } from 'react'

// 👉 TODO 1:创建一个 ThemeContext
// const ThemeContext = createContext(null)

function Navbar() {
  // 👉 TODO 4:用 useContext 读取 theme 和 toggleTheme
  const theme = 'light' // 占位,改成 useContext(ThemeContext) 解构
  return (
    <nav className="shop-nav">
      <span>🍊 有间小店</span>
      <button>{theme === 'light' ? '🌙 切暗黑' : '☀️ 切亮色'}</button>
    </nav>
  )
}

function ProductGrid() {
  const items = ['🍞 面包', '🥛 牛奶', '🧀 奶酪']
  return (
    <div className="shop-grid">
      {items.map((p) => (
        <div className="shop-item" key={p}>
          <span>{p}</span>
          <button>加入购物车</button>
        </div>
      ))}
    </div>
  )
}

export default function ContextLesson() {
  // 👉 TODO 2:在父组件里管理 theme + toggleTheme
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    // 👉 TODO 3:用 ThemeContext.Provider 包裹,把 { theme, toggleTheme } 传下去
    <div className={`demo-card shop ${theme}`}>
      <h2>Context 主题商店</h2>
      <Navbar />
      <ProductGrid />
    </div>
  )
}

/* ------------------------------------------------------------
   参考答案:
   const ThemeContext = createContext(null)
   <ThemeContext.Provider value={{ theme, toggleTheme }}>
     ...
   </ThemeContext.Provider>
   const { theme, toggleTheme } = useContext(ThemeContext)
   ------------------------------------------------------------ */
