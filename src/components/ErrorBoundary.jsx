import React from 'react'

/**
 * 错误边界:当某一关的练习代码写崩了(抛错),
 * 用它兜底,显示友好的报错卡片而不是整个白屏。
 * 这是目前(React 18)少数仍需 class 组件的场景之一。
 */
export default class ErrorBoundary extends React.Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  reset = () => this.setState({ error: null })

  render() {
    if (this.state.error) {
      return (
        <div className="boundary-box">
          <h4>😵 这一关的练习代码抛出了错误</h4>
          <p>别担心,这在学习中很正常。看看下面的错误信息,回到编辑器修一下:</p>
          <pre>{String(this.state.error && this.state.error.message)}</pre>
          <button onClick={this.reset}>我改好了,重试</button>
        </div>
      )
    }
    return this.props.children
  }
}
