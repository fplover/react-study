/**
 * 关卡清单(整个 App 的目录)
 * 每一关的练习组件都放在 ./NN-xxx/ 目录里,这里把它们统一登记。
 * 想调整顺序或增删关卡,改这个数组即可。
 */
import Lesson01 from './01-jsx-basics/index.jsx'
import Lesson02 from './02-props/index.jsx'
import Lesson03 from './03-state-events/index.jsx'
import Lesson04 from './04-conditional/index.jsx'
import Lesson05 from './05-lists-keys/index.jsx'
import Lesson06 from './06-forms/index.jsx'
import Lesson07 from './07-lifting-state/index.jsx'
import Lesson08 from './08-effects/index.jsx'
import Lesson09 from './09-custom-hooks/index.jsx'
import Lesson10 from './10-context/index.jsx'
import Lesson11 from './11-graduation-cart/index.jsx'
import Lesson12 from './12-use-suspense/index.jsx'
import Lesson13 from './13-actions/index.jsx'
import Lesson14 from './14-optimistic/index.jsx'
import Lesson15 from './15-react19-extras/index.jsx'
import Lesson16 from './16-transitions/index.jsx'

// tier: intro(入门) / basic(基础) / adv(进阶) / boss(毕业挑战) / next(React 19 新知)
export const lessons = [
  {
    id: '01-jsx-basics',
    tier: 'intro',
    title: 'JSX 与元素',
    subtitle: '认识 JSX:在 JS 里写"类 HTML",用 {} 嵌入表达式。',
    Component: Lesson01,
    tasks: [
      '把标题改成你自己的名字',
      '用 {} 显示 1 + 2 的计算结果',
      '让某段文字根据 isMorning 显示"早上好/你好"',
    ],
    points: [
      'JSX 不是 HTML,它最终会被编译成 <code>React.createElement(...)</code>。',
      '标签必须闭合;class 要写成 <code>className</code>,for 要写成 <code>htmlFor</code>。',
      '大括号 <code>{}</code> 里可以放任意 JS 表达式,但不能放 if/for 语句。',
      '相邻的多个元素要用一个父节点(或空标签)包起来。',
    ],
    hint: '三元 a ? b : c 是表达式(能放进 {}),而 if(){} 是语句(不能)。',
  },
  {
    id: '02-props',
    tier: 'intro',
    title: 'Props 组件传参',
    subtitle: '把组件当作函数,props 就是它的参数,实现复用。',
    Component: Lesson02,
    tasks: [
      '给 ProfileCard 再传一个 role 属性并显示出来',
      '用解构写法 function ProfileCard({ name, age }) 简化代码',
      '给 age 设置默认值(没传时显示"保密")',
    ],
    points: [
      'props 是父组件传给子组件的只读数据,子组件<b>绝不能修改</b> props。',
      '组件名必须大写开头,React 才知道这是组件而不是 HTML 标签。',
      '解构 <code>{ name, age }</code> 让代码更清爽;可用 <code>= 默认值</code> 兜底。',
      '<code>props.children</code> 表示标签内部包裹的内容。',
    ],
    hint: '默认值写法:function ProfileCard({ name, age = "保密" }) {...}。',
  },
  {
    id: '03-state-events',
    tier: 'basic',
    title: 'State 与事件',
    subtitle: 'useState 让组件"记住"东西,点击后自动重新渲染。',
    Component: Lesson03,
    tasks: [
      '实现减一按钮(点击让计数 -1)',
      '加一个"归零"按钮',
      '让计数为负数时数字变红',
    ],
    points: [
      '<code>const [n, setN] = useState(0)</code>:n 是当前值,setN 是唯一修改途径。',
      '<b>不要直接改</b> n,必须调用 <code>setN</code>,否则界面不会更新。',
      '基于旧值更新时用函数式:<code>setN(prev =&gt; prev + 1)</code> 更安全。',
      '事件名是驼峰式 <code>onClick</code>,值是函数引用而非调用结果。',
    ],
    hint: 'onClick={handleClick} 正确;onClick={handleClick()} 会在渲染时立刻执行,错误。',
  },
  {
    id: '04-conditional',
    tier: 'basic',
    title: '条件渲染',
    subtitle: '根据状态显示不同 UI:三元、&& 与提前 return。',
    Component: Lesson04,
    tasks: [
      '登录后显示"欢迎回来",未登录显示登录按钮',
      '用 && 实现"有未读消息时才显示小红点"',
      '消息数为 0 时不显示数字(小心 0 会被渲染的坑)',
    ],
    points: [
      '三元 <code>cond ? A : B</code> 适合二选一。',
      '<code>cond && A</code> 适合"满足才显示",但 <code>0 && A</code> 会渲染出 0!',
      '所以数字判断建议写 <code>count &gt; 0 &&</code> 而不是 <code>count &&</code>。',
      '复杂分支可在 return 之前用 if 提前 return 不同 JSX。',
    ],
    hint: '{count > 0 && <span>{count}</span>} —— 用 > 0 而不是直接用 count。',
  },
  {
    id: '05-lists-keys',
    tier: 'basic',
    title: '列表渲染与 key',
    subtitle: '用 map 把数组变成一串元素,并理解 key 的意义。',
    Component: Lesson05,
    tasks: [
      '用 map 渲染水果数组',
      '给每个 li 加上稳定的 key(用 id,不要用 index)',
      '实现顶部搜索框,实时过滤列表(filter)',
    ],
    points: [
      '<code>list.map(item =&gt; &lt;li key={item.id}&gt;...&lt;/li&gt;)</code> 是标准写法。',
      'key 帮 React 识别哪些项变了,应稳定且唯一,<b>优先用数据 id</b>。',
      '用数组 index 当 key,在增删/排序时会导致状态错乱。',
      '过滤:先 <code>filter</code> 再 <code>map</code>,链式调用很常见。',
    ],
    hint: 'const shown = fruits.filter(f => f.name.includes(keyword)),再 .map 渲染。',
  },
  {
    id: '06-forms',
    tier: 'basic',
    title: '受控表单',
    subtitle: '让 React state 成为输入框的"唯一真相来源"。',
    Component: Lesson06,
    tasks: [
      '把 name 输入框变成受控组件(value + onChange)',
      '提交时校验:名字不能为空、必须勾选同意条款',
      '提交成功后展示汇总卡片',
    ],
    points: [
      '受控组件:<code>value={state}</code> 且 <code>onChange</code> 里调用 setState。',
      '复选框读 <code>e.target.checked</code>,文本框读 <code>e.target.value</code>。',
      '<code>onSubmit</code> 里要 <code>e.preventDefault()</code> 阻止页面刷新。',
      '校验错误信息也用 state 存,渲染在对应字段下方。',
    ],
    hint: 'onChange={e => setName(e.target.value)};提交前 if (!name.trim()) 设置错误信息。',
  },
  {
    id: '07-lifting-state',
    tier: 'adv',
    title: '状态提升',
    subtitle: '两个子组件要共享数据?把 state 提到共同父级。',
    Component: Lesson07,
    tasks: [
      '摄氏度输入框改变时,华氏度显示同步更新',
      '华氏度输入框改变时,摄氏度也同步',
      '理解:数据放父组件,props 下发 + 回调上传',
    ],
    points: [
      '当多个组件需要同一份数据时,把它<b>提升</b>到最近的共同父组件。',
      '父组件通过 props 把"值"和"修改函数"一起传下去。',
      '子组件不存自己的状态,只负责显示和触发回调 —— 单向数据流。',
      '这是 React 最核心的思维模型之一,务必吃透。',
    ],
    hint: '父组件 useState 存摄氏度;华氏度现算 c*9/5+32,不单独存,避免两份真相。',
  },
  {
    id: '08-effects',
    tier: 'adv',
    title: 'useEffect 副作用',
    subtitle: '与外部世界打交道:定时器、订阅、请求数据。',
    Component: Lesson08,
    tasks: [
      '用 useEffect + setInterval 做每秒 +1 的计时器',
      '在 return 里清理定时器(否则内存泄漏/计时器叠加)',
      '观察 StrictMode 下 effect 跑两次并理解为何要清理',
    ],
    points: [
      '<code>useEffect(fn, deps)</code>:渲染后执行 fn,deps 变化才重新执行。',
      'deps 为 <code>[]</code> 表示只在挂载时跑一次。',
      'fn 里 <code>return () =&gt; {...}</code> 是清理函数,卸载或重跑前调用。',
      '开发环境 StrictMode 会故意挂载→卸载→再挂载,暴露没清理的副作用。',
    ],
    hint: 'const id = setInterval(...); return () => clearInterval(id);',
  },
  {
    id: '09-custom-hooks',
    tier: 'adv',
    title: '自定义 Hook',
    subtitle: '把可复用的逻辑抽成 useXxx 函数,组件更清爽。',
    Component: Lesson09,
    tasks: [
      '把"读写 localStorage"的逻辑抽成 useLocalStorage',
      '用它做一个刷新后依然记得的备忘录',
      '体会:自定义 Hook 复用的是"逻辑",不是 UI',
    ],
    points: [
      '自定义 Hook 就是名字以 <code>use</code> 开头、内部调用了其它 Hook 的普通函数。',
      '它让"有状态的逻辑"可以在多个组件间复用。',
      '返回值形式自定,常见是返回 <code>[value, setValue]</code> 数组。',
      'Hook 只能在组件或其它 Hook 的<b>顶层</b>调用,不能放进 if/循环。',
    ],
    hint: 'useLocalStorage(key, init):useState 初始值从 localStorage 读;setValue 时写回。',
  },
  {
    id: '10-context',
    tier: 'adv',
    title: 'Context 跨层传递',
    subtitle: '免去 props 层层透传,让主题/用户信息全局可用。',
    Component: Lesson10,
    tasks: [
      '用 createContext 建一个主题 Context(light/dark)',
      '用 Provider 包裹小店,深层组件用 useContext 读取',
      '做切换按钮,一键切换整店明暗主题',
    ],
    points: [
      '<code>const Ctx = createContext(默认值)</code> 创建上下文。',
      '<code>&lt;Ctx.Provider value={...}&gt;</code> 提供数据给整棵子树。',
      '任意深度的后代用 <code>useContext(Ctx)</code> 直接读,无需逐层传 props。',
      'Context 适合"全局少变"的数据;频繁变动的大状态另有方案。',
      '<b>React 19 新写法</b>:可以直接 <code>&lt;Ctx value={...}&gt;</code>,不必再写 <code>.Provider</code>。',
    ],
    hint: 'value 放 { theme, toggle };深层组件 const { theme } = useContext(ThemeContext)。',
  },
  {
    id: '11-graduation-cart',
    tier: 'boss',
    title: '毕业挑战:购物车',
    subtitle: '综合运用前 10 关知识,独立完成一个购物车。',
    Component: Lesson11,
    tasks: [
      '商品列表渲染(列表 + key)',
      '加入购物车 / 增减数量 / 移除(state + 事件 + 不可变更新)',
      '实时计算总价与总件数(派生数据)',
      '空购物车时给出友好提示(条件渲染)',
    ],
    points: [
      '这一关没有"填空",而是把前面所有技能组合起来。',
      '购物车是数组 state,增删改都要返回<b>新的</b>数组(不可变更新)。',
      '总价、总件数属于"派生数据",现算而不是再存一份 state。',
      '卡住了就回到对应关卡复习,这正是刻意练习的意义。',
    ],
    hint: '加入购物车:已存在则 map 出数量+1 的新数组,否则 [...cart, {...item, qty:1}]。',
  },
  {
    id: '12-use-suspense',
    tier: 'next',
    title: 'use + Suspense',
    subtitle: 'React 19 的 use:在渲染中直接读取 Promise,加载交给 Suspense。',
    Component: Lesson12,
    tasks: [
      '理解 use(promise) 会让组件"挂起",由 Suspense 显示 fallback',
      '点"换一句"触发新请求,观察加载占位',
      '想清楚:为什么传给 use 的 Promise 必须缓存(稳定)',
    ],
    points: [
      '<code>use(promise)</code> 在 Promise 完成前让组件挂起,由外层 <code>&lt;Suspense&gt;</code> 显示 fallback。',
      'use 不同于其它 Hook,<b>可以</b>写在条件语句里。',
      '传入的 Promise 必须稳定(缓存),否则每次渲染新建 Promise 会无限挂起。',
      '"加载中"交给 Suspense、"出错"交给错误边界,组件只描述成功态。',
    ],
    hint: '用 Map 按 key 缓存 Promise;用 startTransition 包裹刷新可让过渡更平滑。',
  },
  {
    id: '13-actions',
    tier: 'next',
    title: 'Actions 表单',
    subtitle: 'form 的 action 直接接函数,useActionState / useFormStatus 托管状态。',
    Component: Lesson13,
    tasks: [
      '给 <form action={fn}> 传一个 action 函数处理提交',
      '用 useActionState 管理返回状态和自动的 pending',
      '在提交按钮里用 useFormStatus 读取 pending,无需 props 透传',
    ],
    points: [
      'React 19 里 <code>&lt;form action={fn}&gt;</code> 提交时会自动收集 FormData 调用 fn。',
      '<code>useActionState(action, 初始值)</code> 返回 <code>[state, formAction]</code> 并自带 pending。',
      '<code>useFormStatus()</code> 让表单内的子组件直接读到 <code>pending</code>。',
      '省去了 onSubmit、preventDefault 和手写 loading —— 样板代码大减。',
    ],
    hint: 'SubmitButton 必须是 form 内部的独立子组件,才能用 useFormStatus 读到 pending。',
  },
  {
    id: '14-optimistic',
    tier: 'next',
    title: 'useOptimistic 乐观更新',
    subtitle: '操作后先假设成功、立刻更新 UI,失败自动回滚。',
    Component: Lesson14,
    tasks: [
      '用 useOptimistic 在发送期间先显示"发送中"的临时消息',
      '请求返回后用 setState 写入真实数据',
      '理解:action 出错时乐观值会自动被丢弃',
    ],
    points: [
      '<code>useOptimistic(真实值, 更新函数)</code> 返回一个临时的"乐观值"。',
      '在 action 进行期间读到乐观值,action 结束后自动回落到真实值。',
      '让"先响应、后确认"的交互零延迟、很跟手。',
      '若 action 抛错,乐观值自动丢弃,无需手动回滚。',
    ],
    hint: '通常配合 form 的 action 使用:action 里先 addOptimistic(...),await 请求后再 setState。',
  },
  {
    id: '15-react19-extras',
    tier: 'next',
    title: 'React 19 实用改进合集',
    subtitle: 'ref 作为 prop、文档元数据、ref 清理函数,三个小而好用的更新。',
    Component: Lesson15,
    tasks: [
      '写一个直接从 props 解构 ref 的函数组件(告别 forwardRef)',
      '在组件里写 <title>/<meta>,观察它被自动提升到 <head>',
      '给 ref 回调返回一个清理函数,理解其与 useEffect 清理的相似',
    ],
    points: [
      '<b>ref 作为 prop</b>:函数组件可直接 <code>function C({ ref })</code>,不用再 <code>forwardRef</code>。',
      '<b>文档元数据</b>:组件里的 <code>&lt;title&gt;/&lt;meta&gt;/&lt;link&gt;</code> 会自动提升到 <code>&lt;head&gt;</code>。',
      '<b>ref 清理函数</b>:ref 回调可 <code>return () =&gt; {...}</code>,元素卸载时调用。',
      '延伸了解:React Compiler(自动记忆化)、Server Components/Actions。',
    ],
    hint: '这些是"渐进增强",旧写法多数仍可用;先掌握 ref-as-prop 和文档元数据这两个最常用的。',
  },
  {
    id: '16-transitions',
    tier: 'next',
    title: '并发渲染:Transition',
    subtitle: 'useTransition / useDeferredValue 让大列表实时过滤也不卡输入。',
    Component: Lesson16,
    tasks: [
      '用 useTransition 把"重算大列表"包进 startTransition,读取 isPending 显示加载态',
      '用 useDeferredValue 给搜索词一个"延迟版",基于它做昂贵渲染',
      '对比:输入(高优先级)始终跟手,列表(低优先级)在后台追赶',
    ],
    points: [
      '并发特性的本质不是"变快",而是<b>不阻塞</b>高优先级更新(如打字)。',
      '<code>useTransition</code> 返回 <code>[isPending, startTransition]</code>,把慢的 setState 包进去主动降级。',
      '<code>useDeferredValue(value)</code> 返回一个滞后副本,适合值来自 props、你改不到源头的场景。',
      'React 19 里 <code>useDeferredValue</code> 支持传第二个参数作为初始值。',
    ],
    hint: 'onChange 里 setText(高优先级)照常写,再 startTransition(() => setList(...)) 降级重活儿。',
  },
]

export const tierMeta = {
  intro: { label: '入门', className: 'intro' },
  basic: { label: '基础', className: 'basic' },
  adv:   { label: '进阶', className: 'adv' },
  boss:  { label: '毕业挑战', className: 'boss' },
  next:  { label: 'React 19 新知', className: 'next' },
}
