import { useState, useEffect } from 'react'
import { lessons } from './lessons/index.js'
import { useProgress } from './useProgress.js'
import LevelMap from './components/LevelMap.jsx'
import LessonView from './components/LessonView.jsx'

/**
 * 顶层组件:用一个极简的"路由"在关卡地图和详情页之间切换。
 * 这里没用 react-router,而是用 URL 的 hash(#/lesson/xxx),
 * 好处是刷新/收藏都能回到同一关,而且不引入额外依赖。
 */
function parseHash() {
  const m = location.hash.match(/^#\/lesson\/(.+)$/)
  if (m && lessons.some((l) => l.id === m[1])) return { view: 'lesson', id: m[1] }
  return { view: 'map', id: null }
}

export default function App() {
  const [route, setRoute] = useState(parseHash)
  const progress = useProgress()

  // 监听浏览器前进/后退,让 hash 和界面保持同步
  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const goLesson = (id) => {
    location.hash = `#/lesson/${id}`
    window.scrollTo(0, 0)
  }
  const goMap = () => {
    location.hash = ''
    window.scrollTo(0, 0)
  }

  return (
    <div className="app">
      {route.view === 'lesson' ? (
        <LessonView
          key={route.id}
          id={route.id}
          progress={progress}
          onBack={goMap}
          onNav={goLesson}
        />
      ) : (
        <LevelMap progress={progress} onOpen={goLesson} />
      )}

      <footer className="site-footer">
        React 闯关实验室 · 用 Vite + React 19 搭建 ·{' '}
        <span className="motto">"看一百遍不如自己敲一遍"</span>
      </footer>
    </div>
  )
}
