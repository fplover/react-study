import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// React 18/19 的入口写法:createRoot(旧的 ReactDOM.render 在 19 里已被移除)。
// StrictMode 会故意把组件渲染两次、把 effect 跑两遍,
// 帮你提前发现副作用没清理之类的问题(第 08 关你会和它正面相遇)。
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
