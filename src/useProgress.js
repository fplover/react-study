import { useState, useEffect, useCallback } from 'react'

/**
 * 学习进度存档 Hook
 * 把"哪些关卡已完成 / 每关勾选了哪些任务"存进 localStorage,
 * 刷新浏览器也不会丢。这本身就是第 09 关"自定义 Hook"的一个真实例子。
 */
const KEY = 'react-lab-progress-v1'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { done: {}, tasks: {} }
  } catch {
    return { done: {}, tasks: {} }
  }
}

export function useProgress() {
  const [state, setState] = useState(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  // 标记 / 取消某一关"过关"
  const setLessonDone = useCallback((id, done) => {
    setState((s) => ({ ...s, done: { ...s.done, [id]: done } }))
  }, [])

  // 勾选 / 取消某关的第 index 个任务
  const toggleTask = useCallback((id, index) => {
    setState((s) => {
      const cur = s.tasks[id] || {}
      return { ...s, tasks: { ...s.tasks, [id]: { ...cur, [index]: !cur[index] } } }
    })
  }, [])

  const reset = useCallback(() => {
    if (confirm('确定要清空所有学习进度吗?此操作无法撤销。')) {
      setState({ done: {}, tasks: {} })
    }
  }, [])

  return { state, setLessonDone, toggleTask, reset }
}
