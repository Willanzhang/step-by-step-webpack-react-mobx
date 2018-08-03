import React, { Component } from 'react'
import {
  observer,
  inject // 注入组件内部
} from 'mobx-react'
import PropTypes from 'prop-types'
import { AppState } from '../../store/app-state'

@inject('appState') // 注入appState
@observer

export default class TopicList extends Component {
  constructor(props) {
    super(props)
    this.changeName = this.changeName.bind(this)
  }

  // static getDerivedStateFromProps(props, state) {
  //   // ...
  //   console.log(props, state)
  // }

  // componentDidMount() {
  //   // do something
  // }

  changeName(e) {
    this.props.appState.changeName(e.target.value)
  }

  render() {
    const { appState } = this.props
    return (
      <div>
        this is TopicList
        <input type="text" onChange={this.changeName} />
        <h1>
          {appState.msg}
        </h1>
      </div>
    )
  }
}

TopicList.propTypes = {
  // PropTypes.object.isRequire 由于airbnb eslint的严格检验会不通过 因此校验是否是 AppState类
  appState: PropTypes.instanceOf(AppState)
}
