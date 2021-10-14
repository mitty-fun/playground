
import React from 'react'
import ReactDOM from 'react-dom'
import { Playground } from './lib'

const html = '<button onclick="test(); console.log(1);">test</button>'
const css = 'button { background-color: red; color: #fff }'
const javascript = 'function test () { alert("click!") };\nconsole.log(123)'

ReactDOM.render(<Playground javascript={javascript}/>, document.getElementById('root'))