import React from 'react'
import axios from 'axios'

/* eslint-disable */
export default class Test extends React.Component {
  constructor(props) {
    super(props)
    this.getTopics = this.getTopics.bind(this)
    this.login = this.login.bind(this)
    this.markAll = this.markAll.bind(this)
  }

  getTopics() {
    axios.get('/api/topics')
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }

  login() {
    axios.post('/api/user/login', {
      accessToken: 'ef35af2e-95b4-4062-badc-419d3b'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markall</button>
      </div>
    )
  }
}
/* eslint-enable */
