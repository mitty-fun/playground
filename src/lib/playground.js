import React from 'react'
import Editor from '@monaco-editor/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faUndo } from '@fortawesome/free-solid-svg-icons'

import styles from './playground.module.css'

const config = {
  minimap: {
    enabled: false
  },
  lineNumbers: 'off',
  lineNumbersWidth: 1,
  fontSize: 16,
  overviewRulerLanes: 0,
  hideCursorInOverviewRuler: true,
  scrollbar: {
    vertical: 'hidden'
  },
  overviewRulerBorder: false,
  renderLineHighlight: "none",
  automaticLayout: true,
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  wrappingStrategy: 'advanced',
  overviewRulerLanes: 0
}
class Playground extends React.Component {

  constructor(props) {

    let lang, tab
    if (props.html) lang = 'html'
    if (props.css) lang = 'css'
    if (props.javascript) lang = 'javascript'

    super(props)
    this.state = {
      html: props.html || '',
      css: props.css || '',
      javascript: props.javascript || '',
      lang,
      tab: 'console',
      logs: [],
      isShowResult: false,
    }

    this.iframeRef = React.createRef()
    this.editorRef = React.createRef()
  }

  handleChange = (value) => {
    this.setState({ [this.state.lang]: value })
  }

  setLang = (lang) => {
    this.setState({ lang })
  }

  consoleLog = (text) => {
    const log = { content: text, type: 'text' }
    this.setState({ logs: [...this.state.logs, log] })
  }

  onerror = (error) => {
    const log = { content: error, type: 'error' }
    this.setState({ logs: [...this.state.logs, log] })
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
      iframeWindow.onerror = function () { console.log('QAQ'); return false; }
      try {
        iframeWindow.eval(this.state.javascript)
      } catch (e) {
        this.onerror(e.message)
      }
      
    }, 100)
    this.setState({ logs: [], isShowResult: true })
  }

  reset = () => {
    this.setState({
      html: this.props.html,
      css: this.props.css,
      javascript: this.props.javascript,
    })
  }

  handleEditorDidMount = (editor, monaco) => {
    const updateHeight = () => {
      const container = this.editorRef.current
      const contentHeight = Math.min(500, editor.getContentHeight())
      container.style.height = `${contentHeight}px`
      editor.layout({ width: container.clientWidth, height: contentHeight })
    }
    editor.onDidContentSizeChange(updateHeight)

    updateHeight()
  }

  render() {
    return (
      <div class={styles.root}>
        <div class={styles.editorWrapper} ref={this.editorRef}>
          <Editor
            language={this.state.lang}
            value={this.state[this.state.lang]}
            onChange={this.handleChange}
            options={config}
            onMount={this.handleEditorDidMount}
          />
          <div class={styles.languages}>
            {this.props.html && <span class={`${styles.btn} ${this.state.lang === 'html' && styles.active}`} onClick={() => this.setLang('html')}>HTML</span>}
            {this.props.css && <span class={`${styles.btn} ${this.state.lang === 'css' && styles.active}`} onClick={() => this.setLang('css')}>CSS</span>}
            {this.props.javascript && <span class={`${styles.btn} ${this.state.lang === 'javascript' && styles.active}`} onClick={() => this.setLang('javascript')}>JS</span>}
            <span class={styles.btn} onClick={this.run}>
              <FontAwesomeIcon icon={faPlay} />
            </span>
            <span class={styles.btn} onClick={this.reset}>
              <FontAwesomeIcon icon={faUndo} />
            </span>
          </div>
        </div>
        <div class={`${styles.resultWrapper} ${!this.state.isShowResult && styles['d-none']}`}>
          <pre class={`${styles.console} ${this.state.tab !== 'console' && styles['d-none']}`}>
            { this.state.logs.map(log => (<span class={`${log.type === 'error' ? styles.errorlog : styles.textlog}`}>{log.content}</span>)) }
          </pre>
          <div class={this.state.tab !== 'view' && styles['d-none']}>
            <iframe class={styles.iframe} ref={this.iframeRef}></iframe> 
          </div>

          <div class={styles.languages}>
            {this.props.javascript && <span class={`${styles.btn} ${this.state.tab === 'console' && styles.active}`} onClick={() => this.showTab('console')}>Console</span>}
            {this.props.html && <span class={`${styles.btn} ${this.state.tab === 'view' && styles.active}`} onClick={() => this.showTab('view')}>View</span>}
          </div>
        </div>
      </div>
    )
  }
}

export default Playground