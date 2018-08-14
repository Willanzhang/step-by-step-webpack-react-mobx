import {
  observable,
  // toJs,
  // computed,
  action,
  extendObservable
} from 'mobx'
import { topicSchema } from '../util/variable-define'
import { get } from '../util/http'

const createTopic = (topic) => Object.assign({}, topicSchema, topic)

class Topic {
  constructor(data) {
    extendObservable(this, data) // 将对象所有的属性附在 this上
  }

  @observable syncing = false
}

export default class TopicStore {
  @observable topics

  @observable syncing // 是否正在进行数据的请求

  constructor({ syncing, topics } = { syncing: false, topics: [] }) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @action fetchTopics() {
    return new Promise((resolve, reject) => {
      this.syncing = true
      get('/topics', {
        mdrender: false
      }).then(res => {
        if (res.success) {
          res.data.forEach(topic => {
            this.addTopic(topic)
          })
          resolve()
        } else {
          reject()
        }
        this.syncing = false
      }).catch(err => {
        reject(err)
        this.syncing = false
      })
    })
  }
}
