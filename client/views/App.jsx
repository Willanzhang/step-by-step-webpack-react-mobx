import React, { Component } from 'react'
import Router from '../config/router'
import AppBar from './layout/app-bar'
import Container from './layout/container'

export default class App extends Component {
  componentDidMount() {
    // 123
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <div>
        <AppBar />
        <Container>
          <Router />
        </Container>
      </div>
    )
  }
}
