import {
  observable,
  computed,
  autorun,
  action
} from 'mobx'

export default class AppState {
  constructor({ count, name } = { count: 0, name: 'William' }) {
    this.count = count
    this.name = name
  }

  @observable count = 0 // 需要绑定的值

  @observable name = 'William'

  @computed get msg() { // 计算属性
    return `${this.name} say count is ${this.count}`
  }

  @action add() { // 对于appState绑定值的操作
    this.count += 1
  }

  @action changeName(name) {
    this.name = name
  }

  toJson() {
    return {
      count: this.count,
      name: this.name
    }
  }
}

// const appState = new AppState()

autorun(() => { // 监测appState 是否有修改
  // console.log(appState.msg)
})

// setInterval(() => {
//   appState.add()
// }, 3000)

// export default appState
