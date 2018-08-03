import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'

import TopicList from '../views/topic-list'
import TopicDetail from '../views/topic-detail'
import Test from '../views/test/api-test'
// exact

export default () => [
  // <Redirect from="/" to="list" />, // 不推介使用的方法 只在switch 中使用 from
  // react 下返回的数组 都是必须有唯一的key
  <Route path="/" render={() => <Redirect to="/list" />} push exact key="first" />, // push={true} 将redirect 路径放入路由栈中
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail" component={TopicDetail} key="detail" />,
  <Route path="/test" component={Test} key="test" />
]
