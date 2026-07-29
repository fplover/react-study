/**
 * 第 07 关 · 状态提升
 * ------------------------------------------------------------
 * 目标:两个输入框共享同一份温度数据 —— 把 state 放到共同父组件。
 * 摄氏 ⇄ 华氏 双向联动。
 */
import { useState } from 'react'

// 子组件:一个温度输入框。它自己不存 state,只显示 value、上报 onChange。
function TempInput({ label, value, onChange }) {
  return (
    <label style={{ display: 'block', margin: '10px 0', fontWeight: 700 }}>
      {label}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ display: 'block', width: '100%', marginTop: 4, fontWeight: 400 }}
      />
    </label>
  )
}

export default function LiftingState() {
  // 真相只有一个:摄氏度。华氏度由它算出来。
  const [celsius, setCelsius] = useState(25)

  // 👉 TODO:实现华氏度的双向绑定
  // 计算华氏度:const fahrenheit = celsius * 9 / 5 + 32
  // 当华氏输入框变化时:setCelsius((f - 32) * 5 / 9)
  const fahrenheit = '' // 先留空,请你补上换算

  return (
    <div className="demo-card">
      <h2>温度换算器 🌡️</h2>
      <p className="crumb">两个框始终同步,因为它们读写的是同一份父级 state。</p>

      <TempInput label="摄氏度 °C" value={celsius} onChange={setCelsius} />
      <TempInput
        label="华氏度 °F"
        value={fahrenheit}
        onChange={() => {
          /* 👉 TODO:根据华氏值反推摄氏度并 setCelsius */
        }}
      />

      <div className="mini-card">
        当前:<b>{celsius}°C</b> = <b>{fahrenheit || '?'}°F</b>
      </div>

      {/* ------------------------------------------------------------
          参考答案:
          const c = Number(celsius)
          const fahrenheit = Math.round((c * 9 / 5 + 32) * 10) / 10
          华氏输入框 onChange={(f) => setCelsius(Math.round(((Number(f) - 32) * 5 / 9) * 10) / 10)}
         ------------------------------------------------------------ */}
    </div>
  )
}
