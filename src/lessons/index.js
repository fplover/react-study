/**
 * 关卡清单(整个 App 的目录)
 * 对标 React 官方文档(react.dev/learn)的学习路径,分 5 个阶段 20 关:
 *   阶段一 描述 UI(01-04)  阶段二 添加交互(05-08)
 *   阶段三 管理状态(09-12)  阶段四 逃生舱(13-15)
 *   阶段五 实战+React19(16-20)
 */
import Lesson01 from './01-jsx-basics/index.jsx'
import Lesson02 from './02-props/index.jsx'
import Lesson03 from './03-conditional/index.jsx'
import Lesson04 from './04-lists-keys/index.jsx'
import Lesson05 from './05-events-state/index.jsx'
import Lesson06 from './06-state-snapshot/index.jsx'
import Lesson07 from './07-update-state/index.jsx'
import Lesson08 from './08-forms/index.jsx'
import Lesson09 from './09-lifting-state/index.jsx'
import Lesson10 from './10-preserve-reset/index.jsx'
import Lesson11 from './11-use-reducer/index.jsx'
import Lesson12 from './12-context/index.jsx'
import Lesson13 from './13-refs-dom/index.jsx'
import Lesson14 from './14-effects/index.jsx'
import Lesson15 from './15-custom-hooks/index.jsx'
import Lesson16 from './16-graduation-cart/index.jsx'
import Lesson17 from './17-use-suspense/index.jsx'
import Lesson18 from './18-actions-optimistic/index.jsx'
import Lesson19 from './19-transitions/index.jsx'
import Lesson20 from './20-react19-compiler/index.jsx'

// tier: intro(入门) / basic(基础) / adv(进阶) / boss(毕业挑战) / next(React 19 新知)
export const lessons = [
  {
    id: '01-jsx-basics', tier: 'intro', title: 'JSX 与元素',
    subtitle: '认识 JSX:在 JS 里写"类 HTML",用 {} 嵌入表达式。',
    Component: Lesson01,
    tasks: ['把标题改成你自己的名字','用 {} 显示 1 + 2 的计算结果','让某段文字根据 isMorning 显示"早上好/你好"'],
    points: ['JSX 最终会被编译成 <code>React.createElement(...)</code>。','标签必须闭合;class 写成 <code>className</code>,for 写成 <code>htmlFor</code>。','大括号 <code>{}</code> 里可以放任意 JS 表达式,但不能放 if/for 语句。','相邻的多个元素要用一个父节点(或空标签)包起来。'],
    hint: '三元 a ? b : c 是表达式(能放进 {}),而 if(){} 是语句(不能)。',
  },
  {
    id: '02-props', tier: 'intro', title: '组件与 Props',
    subtitle: '把组件当作函数,props 就是它的参数,实现复用。',
    Component: Lesson02,
    tasks: ['给 ProfileCard 再传一个 role 属性并显示出来','用解构写法简化代码','给 age 设置默认值(没传时显示"保密")'],
    points: ['props 是父传子的只读数据,子组件<b>绝不能修改</b> props。','组件名必须大写开头。','解构 <code>{ name, age }</code> 更清爽;可用 <code>= 默认值</code> 兜底。','<code>props.children</code> 是标签内部包裹的内容。'],
    hint: '默认值写法:function ProfileCard({ name, age = "保密" }) {...}。',
  },
  {
    id: '03-conditional', tier: 'intro', title: '条件渲染',
    subtitle: '根据状态显示不同 UI:三元、&& 与提前 return。',
    Component: Lesson03,
    tasks: ['登录后显示"欢迎回来",未登录显示登录按钮','用 && 实现"有未读才显示小红点"','消息数为 0 时不显示数字(小心 0 的坑)'],
    points: ['三元 <code>cond ? A : B</code> 适合二选一。','<code>0 && A</code> 会渲染出 0!要写 <code>count &gt; 0 &&</code>。','复杂分支可在 return 之前用 if 提前 return。'],
    hint: '{count > 0 && <span>{count}</span>} -- 用 > 0 而不是直接用 count。',
  },
  {
    id: '04-lists-keys', tier: 'intro', title: '列表渲染与 key',
    subtitle: '用 map 把数组变成一串元素,并理解 key 的意义。',
    Component: Lesson04,
    tasks: ['用 map 渲染水果数组','给每个 li 加稳定的 key(用 id,不用 index)','实现搜索框实时过滤(filter)'],
    points: ['<code>list.map(item =&gt; &lt;li key={item.id}&gt;...)</code>。','key 帮 React 识别哪些项变了,<b>优先用数据 id</b>。','用 index 当 key 在增删时会导致状态错乱。','先 <code>filter</code> 再 <code>map</code>。'],
    hint: 'const shown = fruits.filter(f => f.name.includes(keyword)),再 .map。',
  },
  {
    id: '05-events-state', tier: 'basic', title: '事件与 State',
    subtitle: 'useState 让组件"记住"东西,onClick 触发更新。',
    Component: Lesson05,
    tasks: ['实现减一按钮','加一个"归零"按钮','让计数为负数时数字变红'],
    points: ['<code>const [n, setN] = useState(0)</code>:setN 是唯一修改途径。','<b>不要直接改</b> n。','基于旧值更新用函数式 <code>setN(prev =&gt; prev + 1)</code>。','事件名驼峰 <code>onClick</code>,值是函数引用。'],
    hint: 'onClick={handleClick} 正确;onClick={handleClick()} 会立刻执行,错误。',
  },
  {
    id: '06-state-snapshot', tier: 'basic', title: 'State 是快照',
    subtitle: '理解 React 最核心心智模型:state 在一次渲染中是固定的。',
    Component: Lesson06,
    tasks: ['点击 +1 后查看控制台,确认打印的是旧值','理解连续三次 setCount(count+1) 只 +1','用函数式更新 setCount(c=>c+1) 实现 +3'],
    points: ['调用 setN 后,当前渲染里 n <b>不会变</b> -- 它是这次渲染的快照。','连续 <code>setN(n+1)</code> 只 +1:三次读到同一个旧快照。','函数式 <code>setN(c =&gt; c+1)</code> 每次拿到排队的最新值。','这解释了"为什么 setState 后立刻读 state 是旧值"。'],
    hint: '想基于旧值更新,就用 setN(prev => prev + 1) 而不是 setN(n + 1)。',
  },
  {
    id: '07-update-state', tier: 'basic', title: '更新对象与数组',
    subtitle: '不可变性:永远创建副本,不直接修改 state。',
    Component: Lesson07,
    tasks: ['实现"长一岁"(展开运算符基于旧 age+1)','用 [...arr, 新项] 添加爱好','用 filter 删除指定下标'],
    points: ['React 靠"引用是否变了"判断要不要重渲染。','对象更新:<code>{ ...obj, key: newVal }</code>。','数组增删改用 <code>spread / filter / map</code>,不用 push/splice。','不可变性是 React 性能优化的基石。'],
    hint: '嵌套对象:{ ...obj, child: { ...obj.child, key: val } }。',
  },
  {
    id: '08-forms', tier: 'basic', title: '受控表单',
    subtitle: '让 React state 成为输入框的"唯一真相来源"。',
    Component: Lesson08,
    tasks: ['把输入框变成受控组件(value + onChange)','提交时校验名字非空且勾选条款','提交成功后展示汇总卡片'],
    points: ['受控组件:<code>value={state}</code> + <code>onChange</code> 调 setState。','复选框读 <code>checked</code>,文本框读 <code>value</code>。','<code>onSubmit</code> 里要 <code>e.preventDefault()</code>。','校验错误也用 state 存。'],
    hint: 'onChange={e => setName(e.target.value)};提交前 if (!name.trim()) 报错。',
  },
  {
    id: '09-lifting-state', tier: 'adv', title: '状态提升',
    subtitle: '两个子组件共享数据?把 state 提到共同父级。',
    Component: Lesson09,
    tasks: ['摄氏输入改变时华氏同步','华氏输入改变时摄氏同步','理解单向数据流'],
    points: ['多个组件需要同一份数据时,把它<b>提升</b>到共同父组件。','父通过 props 把"值"和"修改函数"传下去。','子组件只负责显示和触发回调。','这是 React 最核心的思维模型。'],
    hint: '父组件存摄氏度;华氏度现算 c*9/5+32,不单独存。',
  },
  {
    id: '10-preserve-reset', tier: 'adv', title: 'State 的保留与重置',
    subtitle: 'React 靠位置决定 state 保留还是重置;用 key 强制重置。',
    Component: Lesson10,
    tasks: ['观察同位置同组件切换 props 时 state 保留','用 key 强制重置 state','理解 key 重置表单的实战技巧'],
    points: ['同位置同组件 -> state 保留。','不同 <code>key</code> -> state 重置。','不同组件类型 -> state 重置。','用 <code>key={id}</code> 切换数据时自动重置表单。'],
    hint: '想让组件在切换时"重新开始"?给它一个会变的 key。',
  },
  {
    id: '11-use-reducer', tier: 'adv', title: 'useReducer',
    subtitle: '复杂状态逻辑集中到 reducer,通过 dispatch 触发。',
    Component: Lesson11,
    tasks: ['实现 toggled:map 把指定 id 的 done 取反','实现 deleted:filter 删除指定 id','理解 useState vs useReducer 的取舍'],
    points: ['<code>useReducer(reducer, 初始state)</code> 返回 [state, dispatch]。','reducer 接收 (state, action) 返回新 state,逻辑集中易测试。','dispatch 描述"发生了什么",如 <code>{ type: "added" }</code>。','状态复杂或需联动时用 useReducer。'],
    hint: 'reducer 里 switch(action.type),每个 case 返回新 state。',
  },
  {
    id: '12-context', tier: 'adv', title: 'Context 跨层传递',
    subtitle: '免去 props 层层透传,让全局数据跨层可用。',
    Component: Lesson12,
    tasks: ['用 createContext 建主题 Context','用 Provider 包裹,深层用 useContext 读取','做切换按钮一键切换主题'],
    points: ['<code>createContext(默认值)</code> 创建上下文。','<code>&lt;Ctx.Provider value={...}&gt;</code> 提供数据。','<code>useContext(Ctx)</code> 直接读取。','<b>React 19</b>:可直接 <code>&lt;Ctx value={...}&gt;</code>。'],
    hint: 'value 放 { theme, toggle };深层 const { theme } = useContext(Ctx)。',
  },
  {
    id: '13-refs-dom', tier: 'adv', title: 'Ref 与 DOM',
    subtitle: 'useRef:引用不触发渲染的值,或直接操作 DOM。',
    Component: Lesson13,
    tasks: ['用 ref 聚焦输入框','用 ref 测量 DOM 尺寸','理解 ref 变化不触发重渲染'],
    points: ['<code>useRef(初始值)</code> 返回 <code>{ current }</code>,改它不触发渲染。','ref 挂 DOM 上可访问节点。','<b>React 19</b>:ref 可直接作为 prop,不需 forwardRef。','ref 回调可返回清理函数。'],
    hint: 'const ref = useRef(null); <input ref={ref} />; ref.current.focus()。',
  },
  {
    id: '14-effects', tier: 'adv', title: 'useEffect 深入',
    subtitle: '副作用、清理函数,以及"你可能不需要 effect"。',
    Component: Lesson14,
    tasks: ['用 useEffect+setInterval 做计时器','在 return 里清理定时器','理解:effect 只用于"和外部系统同步"'],
    points: ['<code>useEffect(fn, deps)</code>:deps 变化才重跑。','fn 里 <code>return () =&gt; {...}</code> 是清理函数。','<b>你可能不需要 effect</b>:派生数据直接算,事件逻辑放事件处理函数。','effect 只用于同步外部系统(订阅、请求、DOM)。'],
    hint: 'const id = setInterval(...); return () => clearInterval(id);',
  },
  {
    id: '15-custom-hooks', tier: 'adv', title: '自定义 Hook',
    subtitle: '把可复用逻辑抽成 useXxx 函数。',
    Component: Lesson15,
    tasks: ['读懂 useLocalStorage 实现','用它做刷新后依然记得的备忘录','体会:Hook 复用逻辑不是 UI'],
    points: ['名字以 <code>use</code> 开头、内部调用其它 Hook 的函数。','让有状态的逻辑跨组件复用。','常见返回 <code>[value, setValue]</code>。','只能在组件或 Hook 顶层调用。'],
    hint: 'useLocalStorage:useState 初始值从 localStorage 读;setValue 时写回。',
  },
  {
    id: '16-graduation-cart', tier: 'boss', title: '毕业挑战:购物车',
    subtitle: '综合运用前 15 关知识,独立完成一个购物车。',
    Component: Lesson16,
    tasks: ['商品列表渲染(列表 + key)','加入/增减/移除(state + 不可变更新)','实时计算总价与总件数(派生数据)','空购物车友好提示(条件渲染)'],
    points: ['购物车数组 state,增删改返回<b>新</b>数组。','总价总件数是派生数据,现算不另存。','加入:已存在则 map 数量+1,否则 [...cart, {...item, qty:1}]。','卡住了回对应关卡复习。'],
    hint: '加入购物车:已存在则 map 数量+1,否则 [...cart, {...item, qty:1}]。',
  },
  {
    id: '17-use-suspense', tier: 'next', title: 'use + Suspense',
    subtitle: 'React 19 的 use:渲染中读取 Promise,加载交给 Suspense。',
    Component: Lesson17,
    tasks: ['理解 use(promise) 让组件挂起','点"换一句"观察加载占位','理解 Promise 必须缓存(稳定)'],
    points: ['<code>use(promise)</code> 挂起时由 <code>&lt;Suspense&gt;</code> 显示 fallback。','use <b>可以</b>写在条件语句里。','Promise 必须稳定,否则无限挂起。','加载交给 Suspense,出错交给错误边界。'],
    hint: '用 Map 缓存 Promise;startTransition 包裹刷新更平滑。',
  },
  {
    id: '18-actions-optimistic', tier: 'next', title: 'Actions + 乐观更新',
    subtitle: 'useActionState 管理表单,useOptimistic 实现乐观 UI。',
    Component: Lesson18,
    tasks: ['给 form action 传 async 函数处理提交','用 useOptimistic 先显示"发送中"临时消息','理解 action 出错乐观值自动丢弃'],
    points: ['<code>&lt;form action={fn}&gt;</code> 自动收集 FormData。','<code>useActionState(action, 初始值)</code> 自带 pending。','<code>useOptimistic</code> 在 action 期间显示乐观值,结束回落。','action 抛错乐观值自动丢弃。'],
    hint: 'action 里先 addOptimistic(...),await 请求后再 setState。',
  },
  {
    id: '19-transitions', tier: 'next', title: '并发渲染:Transition',
    subtitle: 'useTransition / useDeferredValue 让大列表不卡输入。',
    Component: Lesson19,
    tasks: ['用 startTransition 降级重算,读 isPending','用 useDeferredValue 给搜索词延迟版','对比:输入跟手,列表后台追赶'],
    points: ['并发不是"变快"而是<b>不阻塞</b>高优先级更新。','<code>useTransition</code> 返回 [isPending, startTransition]。','<code>useDeferredValue</code> 返回滞后副本。','React 19 里 useDeferredValue 支持初始值参数。'],
    hint: 'setText(高优先级),startTransition(() => setList(...)) 降级。',
  },
  {
    id: '20-react19-compiler', tier: 'next', title: 'React 19 改进 + Compiler',
    subtitle: 'ref 作为 prop、文档元数据、ref 清理、React Compiler。',
    Component: Lesson20,
    tasks: ['写直接解构 ref 的函数组件','在组件写 <title> 观察自动提升到 <head>','理解 React Compiler 自动记忆化'],
    points: ['<b>ref 作为 prop</b>:直接 <code>function C({ ref })</code>,不用 forwardRef。','<b>文档元数据</b>:<code>&lt;title&gt;/&lt;meta&gt;</code> 自动提升到 <code>&lt;head&gt;</code>。','<b>ref 清理</b>:ref 回调可 return 清理函数。','<b>Compiler</b>:自动记忆化,少写 useMemo/useCallback。'],
    hint: '渐进增强,旧写法仍可用;先掌握 ref-as-prop 和文档元数据。',
  },
]

export const tierMeta = {
  intro: { label: '入门', className: 'intro' },
  basic: { label: '基础', className: 'basic' },
  adv:   { label: '进阶', className: 'adv' },
  boss:  { label: '毕业挑战', className: 'boss' },
  next:  { label: 'React 19 新知', className: 'next' },
}
