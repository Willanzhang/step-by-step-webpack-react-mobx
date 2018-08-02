import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import Router from '../config/router'

export default class App extends Component {
  componentDidMount() {
    // 123
  }

  render() {
    return (
      <div>
        this is app1
        <Link to="/">首页</Link>
        <br />
        <Link to="detail">详情</Link>
        <Router />
      </div>
    )
  }
}
