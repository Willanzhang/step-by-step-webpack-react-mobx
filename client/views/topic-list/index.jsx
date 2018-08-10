import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import {
  observer,
  inject // 注入组件内部
} from 'mobx-react'
import PropTypes from 'prop-types'
import AppState from '../../store/app-state'
import TopicListItem from './list-item'
// import Container from '../layout/container'

@inject('appState') // 注入appState
@observer

class TopicList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0
    }
    this.changeName = this.changeName.bind(this)
    this.changeTab = this.changeTab.bind(this)
    this.listItemClick = this.listItemClick.bind(this)
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

  changeTab(e, index) {
    this.setState({
      tabIndex: index
    })
  }
  /* eslint-disable */
  listItemClick() {
    console.log(111)
  }
  /* eslint-enable */

  render() {
    const topic = [
      {
        username: '张三',
        title: 'this is title',
        replay_count: 20,
        visit_count: 30,
        create_at: 'asdads',
        tab: 'share'
      },
      { username: '李四' }
    ]
    const { appState } = this.props
    const {
      tabIndex
    } = this.state
    return (
      <div>
        <Helmet>
          <meta name="description" content="this is description123" />
          <title>
            this is topic list1
          </title>
        </Helmet>
        <Tabs value={tabIndex} onChange={this.changeTab}>
          <Tab label="全部" />
          <Tab label="分享" />
          <Tab label="工作" />
          <Tab label="问答" />
          <Tab label="精品" />
          <Tab label="测试" />
        </Tabs>
        <TopicListItem onClick={this.listItemClick} topic={topic} />
        <Button variant="contained" raised="true" color="primary"> this is button1 </Button>
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
export default TopicList
