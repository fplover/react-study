/**
 * 第 02 关 · Props 组件传参
 * ------------------------------------------------------------
 * 目标:把组件当函数,用 props 传入数据实现复用。
 */

// 👉 TODO 2:把参数改成解构写法  function ProfileCard({ name, age, role })
// 👉 TODO 3:给 age 设置默认值(没传时显示"保密")
function ProfileCard(props) {
  return (
    <div className="mini-card">
      <h3>{props.name}</h3>
      <p>年龄:{props.age}</p>
      {/* 👉 TODO 1:在这里显示 props.role(职业) */}
    </div>
  )
}

export default function PropsLesson() {
  return (
    <div className="demo-card">
      <h2>团队名片墙</h2>
      <p className="crumb">同一个 ProfileCard 组件,传入不同 props,就能复用出多张名片。</p>

      <ProfileCard name="阿宝" age={25} role="前端工程师" />
      <ProfileCard name="小美" age={30} role="设计师" />
      {/* 这一张故意不传 age,用来测试你的默认值是否生效 */}
      <ProfileCard name="老王" role="产品经理" />

      {/* ------------------------------------------------------------
          参考答案:
          function ProfileCard({ name, age = '保密', role }) {
            return (
              <div className="mini-card">
                <h3>{name}</h3>
                <p>年龄:{age}</p>
                <p>职业:{role}</p>
              </div>
            )
          }
         ------------------------------------------------------------ */}
    </div>
  )
}
