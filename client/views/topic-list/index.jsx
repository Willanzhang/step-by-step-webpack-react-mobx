import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CircularProgress from '@material-ui/core/CircularProgress'
import queryString from 'query-string'
import {
  observer,
  inject // 注入组件内部
} from 'mobx-react'
import PropTypes from 'prop-types'

import { AppState, TopicStore } from '../../store/store'
import TopicListItem from './list-item'
import { tabs } from '../../util/variable-define'

// import Container from '../layout/container'

// @inject('appState') // 注入appState
@inject((stores) => ({
  appState: stores.appState,
  topicStore: stores.topicStore
})) // 注入appState

@observer

class TopicList extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props)
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
    const tab = this.getTab()
    this.props.topicStore.fetchTopics(tab)
  }

  componentWillReceiveProps(nextProps) {
    const tab = this.getTab(nextProps.location.search)
    if (nextProps.location.search !== this.props.location.search) {
      this.props.topicStore.fetchTopics(tab)
    }
  }

  getTab(search) {
    search = search || this.props.location.search
    const query = queryString.parse(search)
    return query.tab || 'all'
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

  changeTab(e, value) {
    this.context.router.history.push({
      pathname: '/list',
      search: `?tab=${value}`
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

    const topic = (topicStore && topicStore.topics) || topic1

    const syncingTopics = topicStore.syncing
    // const query = queryString.parse(this.props.location.search)
    const tab = this.getTab()
    return (
      <div>
        <Helmet>
          <meta name="description" content="this is description123" />
          <title>
            this is topic list1
          </title>
        </Helmet>
        <Tabs value={tab} onChange={this.changeTab}>
          {
            Object.keys(tabs).map((tab1) => <Tab key={tab1} label={tabs[tab1]} value={tab1} />)
          }
        </Tabs>
        {
          syncingTopics ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '40px 0'
              }}
            >
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
  appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.instanceOf(TopicStore).isRequired
}
TopicList.propTypes = {
  location: PropTypes.object.isRequired
}
export default TopicList
