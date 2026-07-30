# React 闯关实验室 🎮

一个「边学边练」的 React 学习项目:20 个由浅入深的关卡,对标 React 官方文档学习路径,从 JSX 一路练到 React 19 新特性。
每一关都有**任务清单**、**可运行的练习代码**、**参考答案**和**知识要点**。

## 🚀 启动

```bash
npm install     # 已经装好,可跳过
npm run dev     # 启动开发服务器,浏览器会自动打开
```

打开后你会看到「关卡地图」,点任意卡片进入关卡。

## 🌐 部署到 GitHub Pages(在线访问)

本项目已配好自动部署,推送到 GitHub 后可生成一个人人可访问的静态网址。

**首次设置(只需一次):**

1. 把代码推送到 GitHub 的 `main` 分支:
   ```bash
   git init
   git add .
   git commit -m "React 闯关实验室"
   git branch -M main
   git remote add origin https://github.com/你的用户名/仓库名.git
   git push -u origin main
   ```
2. 打开仓库的 **Settings → Pages**,把 **Source** 设为 **GitHub Actions**。
3. 完成!之后每次 `git push` 到 `main`,`.github/workflows/deploy.yml` 会自动
   构建并部署。构建约 1~2 分钟,完成后访问:
   `https://你的用户名.github.io/仓库名/`

**为什么开箱即用、刷新也不会 404?**

- `vite.config.js` 里设了 `base: './'`(相对路径),资源不受子路径影响,
  换任何仓库名都不用改配置。
- 应用用的是 **hash 路由**(`#/lesson/xxx`),GitHub Pages 无需任何重定向 hack
  就能正确处理刷新和直达链接。

> 想部署到 Vercel / Netlify 也可以:它们会自动识别 Vite 项目,
> 构建命令 `npm run build`、输出目录 `dist`,零配置。

## 🗺️ 怎么学(重要)

1. 从第 01 关开始,**按顺序**闯关。
2. 进入关卡后,左边是「练习舞台」,右边是「闯关手册」(任务 + 要点)。
3. 「练习舞台」有两种模式,顶部可切换:
   - **✏️ 页面编辑(默认)**:直接在浏览器里改代码,停止输入约 0.4 秒后自动运行,
     上方实时预览效果。改错了会显示友好报错,改对了自动恢复。你的修改会存进浏览器,
     刷新不丢;点「重置」可恢复初始代码。
   - **▶️ 只读运行**:只看关卡的原始运行效果,不可编辑。
4. 每关代码里都有 `👉 TODO` 注释指引你动手,文件末尾还附了「参考答案」——
   先自己写,卡住看提示,最后才对答案。
5. 也可以用本地编辑器打开 `src/lessons/编号-名称/index.jsx` 修改,保存后热更新
   (适合想用完整编辑器体验的同学)。
6. 完成后在右侧勾选任务、点「🏅 盖章:我过关了」。进度会自动存到浏览器。

## 📚 关卡一览

对标 [React 官方文档](https://react.dev/learn) 的学习路径,分 5 个阶段:

| # | 关卡 | 阶段 | 核心概念 |
|---|------|------|----------|
| 01 | JSX 与元素 | 描述 UI | JSX、`{}` 表达式 |
| 02 | 组件与 Props | 描述 UI | props、组件复用、解构、默认值 |
| 03 | 条件渲染 | 描述 UI | 三元、`&&`、`0` 的坑 |
| 04 | 列表渲染与 key | 描述 UI | `map`、`key`、`filter` |
| 05 | 事件与 State | 添加交互 | `useState`、事件处理、函数式更新 |
| 06 | State 是快照 | 添加交互 | 快照模型、为什么 setState 后读不到新值 |
| 07 | 更新对象与数组 | 添加交互 | 不可变性、spread、嵌套更新 |
| 08 | 受控表单 | 添加交互 | 受控组件、校验、`onSubmit` |
| 09 | 状态提升 | 管理状态 | 单向数据流、共享 state |
| 10 | State 的保留与重置 | 管理状态 | key 重置组件、位置决定 state |
| 11 | useReducer | 管理状态 | reducer、dispatch、复杂状态 |
| 12 | Context 跨层传递 | 管理状态 | `createContext`、`useContext` |
| 13 | Ref 与 DOM | 逃生舱 | `useRef`、DOM 操作、ref 作为 prop |
| 14 | useEffect 深入 | 逃生舱 | 副作用、清理、"你可能不需要 effect" |
| 15 | 自定义 Hook | 逃生舱 | `useXxx`、逻辑复用、localStorage |
| 16 | 毕业挑战:购物车 | 毕业挑战 | 综合实战、不可变更新、派生数据 |
| 17 | use + Suspense | React 19 | `use` 读取 Promise、`<Suspense>` |
| 18 | Actions + 乐观更新 | React 19 | `useActionState`、`useOptimistic` |
| 19 | 并发渲染:Transition | React 19 | `useTransition`、`useDeferredValue` |
| 20 | R19 改进 + Compiler | React 19 | ref prop、文档元数据、Compiler |

## 🧭 项目结构

```
src/
├─ main.jsx              入口
├─ App.jsx               顶层:极简 hash 路由(地图 ↔ 关卡)
├─ useProgress.js        进度存档(本身就是自定义 Hook 的真实范例)
├─ index.css             全部样式
├─ components/
│  ├─ LevelMap.jsx       首页关卡地图
│  ├─ LessonView.jsx     关卡详情页
│  └─ ErrorBoundary.jsx  练习写崩时的兜底
└─ lessons/
   ├─ index.js           关卡清单(目录索引)
   └─ NN-xxx/index.jsx   每一关的练习(你主要改这些)
```

## 💡 小贴士

- 改崩了不要慌:错误边界会显示报错信息,不会白屏。
- 想加新关卡?在 `src/lessons/` 新建目录写组件,再到 `src/lessons/index.js` 登记即可。
- 点「重置进度」可以清空所有存档,从头再来。

祝闯关愉快,毕业时你就能独立写 React 组件啦!🎓
