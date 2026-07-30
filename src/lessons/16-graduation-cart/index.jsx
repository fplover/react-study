/**
 * 第 11 关 · 毕业挑战:购物车 🛒
 * ------------------------------------------------------------
 * 这是最后一关,没有逐行 TODO 了。
 * 右侧任务清单就是你的需求文档:
 *   1. 商品列表渲染
 *   2. 加入购物车 / 增减数量 / 移除
 *   3. 实时计算总价与总件数
 *   4. 空购物车时友好提示
 *
 * 框架代码已经搭好,你只需要填充逻辑。
 * 提示:前面 10 关的招式这里全都要用上!
 */
import { useState } from 'react'

const PRODS = [
  { id: 1, name: '机械键盘', emoji: '⌨️', price: 399 },
  { id: 2, name: '降噪耳机', emoji: '🎧', price: 899 },
  { id: 3, name: '咖啡豆', emoji: '☕', price: 68 },
  { id: 4, name: '桌面绿植', emoji: '🪴', price: 39 },
  { id: 5, name: 'React 书', emoji: '📘', price: 89 },
  { id: 6, name: '手账本', emoji: '📓', price: 25 },
]

export default function GraduationCart() {
  // 购物车数组: [{ id, name, price, qty }, ...]
  const [cart, setCart] = useState([])

  // 加:已存在则 qty+1,否则追加
  const addItem = (product) => {
    // 👉 你的代码
  }

  // 减:qty-1,变为 0 时移除
  const decItem = (id) => {
    // 👉 你的代码
  }

  // 移除整项
  const removeItem = (id) => {
    // 👉 你的代码
  }

  // 总件数和总价:现算(派生数据)
  const totalQty = 0 // 👉 改成 cart.reduce(...)
  const totalPrice = 0 // 👉 改成 cart.reduce(...)

  return (
    <div className="demo-card" style={{ maxWidth: 750 }}>
      <h2>🎓 毕业挑战 · 购物车</h2>

      <div className="shop-body">
        <div>
          <h3>商品列表</h3>
          <div className="shop-grid">
            {PRODS.map((p) => (
              <div className="shop-item" key={p.id}>
                <span style={{ fontSize: 28 }}>{p.emoji}</span>
                <span>{p.name}</span>
                <span>¥{p.price}</span>
                <button className="btn-primary" onClick={() => addItem(p)}>
                  加入购物车
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-panel">
          <h3>🧺 购物车</h3>
          {cart.length === 0 ? (
            <p className="crumb" style={{ textAlign: 'center', padding: 20 }}>
              购物车空空的,去逛逛吧~
            </p>
          ) : (
            <>
              {/* 👉 用 map 渲染购物车列表 */}
              <hr />
              <div className="total-line">
                <span>合计</span>
                <span>¥{totalPrice}</span>
              </div>
              <p className="count">共 {totalQty} 件商品</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------
   参考答案(不偷看!先自己写):
   const addItem = (p) => {
     const exist = cart.find((c) => c.id === p.id)
     if (exist) {
       setCart(cart.map((c) => c.id === p.id ? { ...c, qty: c.qty + 1 } : c))
     } else {
       setCart([...cart, { ...p, qty: 1 }])
     }
   }
   const decItem = (id) => {
     const item = cart.find((c) => c.id === id)
     if (item && item.qty <= 1) {
       setCart(cart.filter((c) => c.id !== id))
     } else {
       setCart(cart.map((c) => c.id === id ? { ...c, qty: c.qty - 1 } : c))
     }
   }
   const removeItem = (id) => setCart(cart.filter((c) => c.id !== id))
   const totalQty = cart.reduce((s, c) => s + c.qty, 0)
   const totalPrice = cart.reduce((s, c) => s + c.price * c.qty, 0)
   ------------------------------------------------------------ */
