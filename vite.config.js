import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 想了解每个配置项,可以读官方文档: https://cn.vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 用相对路径打包,这样部署到 GitHub Pages 的子路径
  // (https://用户名.github.io/仓库名/)时,静态资源也能正确加载。
  // 无论仓库叫什么名字都不用改这里 —— 配合本项目的 hash 路由,刷新也不会 404。
  base: './',
  server: {
    open: true, // 启动 dev server 时自动打开浏览器
  },
})
