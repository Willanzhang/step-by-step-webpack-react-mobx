import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Button from '@material-ui/core/Button'

import {
  observer,
  inject // 注入组件内部
} from 'mobx-react'
import PropTypes from 'prop-types'
import AppState from '../../store/app-state'

@inject('appState') // 注入appState
@observer

export default class TopicList extends Component {
  constructor(props) {
    super(props)
    this.changeName = this.changeName.bind(this)
  }

  asyncBootstrap() { // dev-static会在执行完这个asyncBootstrap方法里的函数再渲染
    return new Promise((resolve) => {
      this.props.appState.count = 3
      resolve(true) // 需要resolve true 要不然不知道是否执行完
    })
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
        <Helmet>
          <meta name="description" content="this is description123" />
          <title>
            this is topic list1
          </title>
        </Helmet>
        <Button raised="true" color="primary"> this is button1 </Button>
        this is TopicList123
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
