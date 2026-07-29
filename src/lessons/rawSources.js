/**
 * 用 Vite 的 glob + ?raw 把每一关的源码文件当作"纯文本"读进来,
 * 作为页面内代码编辑器的初始内容。
 * 键是关卡 id(如 '01-jsx-basics'),值是该关 index.jsx 的源码字符串。
 */
const modules = import.meta.glob('./*/index.jsx', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const rawSources = {}
for (const path in modules) {
  const m = path.match(/\.\/(.+)\/index\.jsx$/)
  if (m) rawSources[m[1]] = modules[path]
}
