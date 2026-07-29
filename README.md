# React 闯关实验室 🎮

一个「边学边练」的 React 学习项目:16 个由浅入深的关卡,从 JSX 一路练到 React 19 新特性。
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

| # | 关卡 | 难度 | 核心概念 |
|---|------|------|----------|
| 01 | JSX 与元素 | 入门 | JSX、`{}` 表达式 |
| 02 | Props 组件传参 | 入门 | props、组件复用、解构、默认值 |
| 03 | State 与事件 | 基础 | `useState`、事件处理、函数式更新 |
| 04 | 条件渲染 | 基础 | 三元、`&&`、`0` 的坑 |
| 05 | 列表渲染与 key | 基础 | `map`、`key`、`filter` |
| 06 | 受控表单 | 基础 | 受控组件、校验、`onSubmit` |
| 07 | 状态提升 | 进阶 | 单向数据流、共享 state |
| 08 | useEffect 副作用 | 进阶 | 副作用、清理函数、StrictMode |
| 09 | 自定义 Hook | 进阶 | `useXxx`、逻辑复用、localStorage |
| 10 | Context 跨层传递 | 进阶 | `createContext`、`useContext` |
| 11 | 毕业挑战:购物车 | 毕业挑战 | 综合实战、不可变更新、派生数据 |
| 12 | use + Suspense | React 19 新知 | `use` 读取 Promise、`<Suspense>` |
| 13 | Actions 表单 | React 19 新知 | `<form action>`、`useActionState`、`useFormStatus` |
| 14 | useOptimistic 乐观更新 | React 19 新知 | 乐观 UI、自动回滚 |
| 15 | React 19 实用改进合集 | React 19 新知 | ref 作为 prop、文档元数据、ref 清理函数 |
| 16 | 并发渲染:Transition | React 19 新知 | `useTransition`、`useDeferredValue`、大列表不卡顿 |

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
