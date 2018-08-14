import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CircularProgress from '@material-ui/core/CircularProgress'

import {
  observer,
  inject // 注入组件内部
} from 'mobx-react'
import PropTypes from 'prop-types'
import { AppState, TopicStore } from '../../store/store'
import TopicListItem from './list-item'
// import Container from '../layout/container'

// @inject('appState') // 注入appState
@inject((stores) => ({
  appState: stores.appState,
  topicStore: stores.topicStore
})) // 注入appState

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

  // static getDerivedStateFromProps(props, state) {
  //   // ...
  //   console.log(props, state)
  // }

  componentDidMount() {
    // do something
    this.props.topicStore.fetchTopics()
  }

  asyncBootstrap() { // dev-static会在执行完这个asyncBootstrap方法里的函数再渲染 服务端渲染时使用
    return new Promise((resolve) => {
      this.props.appState.count = 3
      resolve(true) // 需要resolve true 要不然不知道是否执行完
    })
  }

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
    const topic1 = [
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

    const {
      topicStore,
      appState
    } = this.props

    const topic = topic1 || (topicStore && topicStore.topics)

    const syncingTopics = topicStore.syncing

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
        {
          syncingTopics ? (
            <div>
              <CircularProgress color="secondary" size={100} />
            </div>
          ) : null
        }
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

TopicList.wrappedComponent.propTypes = { // 验证mobx注入验证使用wrappedComponent
  // PropTypes.object.isRequire 由于airbnb eslint的严格检验会不通过 因此校验是否是 AppState类
  appState: PropTypes.instanceOf(AppState),
  topicStore: PropTypes.instanceOf(TopicStore)
}
// TopicList.propTypes = {
//   // PropTypes.object.isRequire 由于airbnb eslint的严格检验会不通过 因此校验是否是 AppState类
// }
export default TopicList
