import React from 'react'
import Editor from '@monaco-editor/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faUndo } from '@fortawesome/free-solid-svg-icons'

import styles from './playground.module.css'

class Playground extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      html: props.html || '',
      css: props.css || '',
      javascript: props.javascript || '',
      lang: 'javascript',
      tab: 'console',
      logs: [],
    }

    this.iframeRef = React.createRef()
  }

  handleChange = (value) => {
    this.setState({ [this.state.lang]: value })
  }

  setLang = (lang) => {
    this.setState({ lang })
  }

  consoleLog = (text) => {
    this.setState({ logs: [ ...this.state.logs, text] })
  }

  onerror = (error) => {
    this.setState({ logs: [ ...this.state.logs, error] })
  }

  showTab = (tab) => {
    this.setState({ tab })
  }

  run = () => {
    const html = `${this.state.html}<style>${this.state.css}</style>`
    const iframeWindow = this.iframeRef.current.contentWindow
    iframeWindow.location.reload()
    setTimeout(() => {
      iframeWindow.document.write(html)
      iframeWindow.console.log = this.consoleLog
      iframeWindow.onerror = this.onerror
      iframeWindow.eval(this.state.javascript)
    }, 100)
    this.setState({ logs: [] })
  }

  reset = () => {
    this.setState({
      html: this.props.html,
      css: this.props.css,
      javascript: this.props.javascript,
    })
  }

  render() {
    return (
      <div class={styles.root}>
        <div class={styles.tabs}>
          <span class={styles['tabs-item']} onClick={() => this.setLang('html')}>HTML</span>
          <span class={styles['tabs-item']} onClick={() => this.setLang('css')}>CSS</span>
          <span class={styles['tabs-item']} onClick={() => this.setLang('javascript')}>JavaScript</span>
          <span class={styles['tabs-item']} onClick={this.run}>
            <FontAwesomeIcon icon={faPlay} />
          </span>
          <span class={styles['tabs-item']} onClick={this.reset}>
            <FontAwesomeIcon icon={faUndo} />
          </span>
        </div>
        <div className={styles.editor}>
            <Editor
              language={this.state.lang}
              value={this.state[this.state.lang]}
              onChange={this.handleChange}
              options={{
                minimap: {
                  enabled: false
                },
                fontSize: 16
              }}
            />
        </div>
        <div>
          <div class={styles.tabs}>
            <span class={styles['tabs-item']} onClick={() => this.showTab('console')}>console</span>
            <span class={styles['tabs-item']} onClick={() => this.showTab('view')}>view</span>
          </div>
          <div class={styles.content}>
            <div class={this.state.tab === 'view' ? styles['d-none'] : ''}>
              <iframe class={styles.iframe} ref={this.iframeRef}></iframe> 
            </div>
            <div class={this.state.tab === 'console' ? styles['d-none'] : ''}>
              { this.state.logs.map(text => (<p>{text}</p>)) }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Playground