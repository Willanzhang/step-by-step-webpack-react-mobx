const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs') // 内存读写模块
const path = require('path')
const proxy = require('http-proxy-middleware')
const serverConfig = require('../../build/webpack.config.server')
const serverRender = require('./server-render')

serverConfig.mode = 'development' // 开发环境才使用

const getTemplate = () => { // 获取html模板
  return new Promise((resolve, reject) => {
    // axios.get('http://localhost:8888/public/index.html')
    axios.get('http://localhost:8888/public/server.ejs')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const NativeModule = require('module')
const vm = require('vm')
// const Module = module.constructor // 利用Module创建一个新的module

const getModuleFromString = (bundle, filename) => { //1- 和webpack.config.server.js的配置externals 使用 因为不再每次都将需要的重新打包成一个文件，只打包自己的代码
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle) // 将可执行的javaScript 代码包装一下  成为`(function(exports, require, module, __filename, __dirname){...bulder code})`
  const script = new vm.Script(wrapper, { // vm 的script类
    filename: filename,
    displayErrors: true
  })
  const result = script.runInThisContext() // 设置执行环境的上下文
  result.call(m.exports, m.exports, require, m) // 这里require 是当前环境的require  会从node_modules查找
  return m
}

const mfs = new MemoryFs()
let serverBundle, createStoreMap
const serverCompiler = webpack(serverConfig) // webpack 模块调用

serverCompiler.outputFileSystem = mfs // 在开发环境中 dist文件夹是不存在的， 所有的打包文件是保存在虚拟内存中， 使用fs模块是读取不了的 因此使用memory-fs模块可以读取内存中的文件
serverCompiler.watch({}, (err, stats) => { // 检测是否有改变  监听webpack打包过程
  if (err) throw err
  stats = stats.toJson() // stats
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(err => console.warn(err))
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8') // bundle 读取出来是个string 并不是模块
  // const m = new Module()
  // m._compile(bundle, 'server-entry.js') // 将bundle（string）转化为 export default 模块形式 用Module解析 这个 srting  成为 javascript   !必须制定module的名字 'server-entry.js'
  const m = getModuleFromString(bundle, 'server-entry.js') // 2-
  // serverBundle = m.exports.default // 注意！ .default
  serverBundle = m.exports // 注意！ .default
  // createStoreMap = m.exports.createStoreMap
})



module.exports = function (app) {
  app.use('/public', proxy({ // 这里没法设置静态文件地址 因为硬盘上并没有， 只能通过代理简介设置静态文件地址
    target: 'http://localhost:8888'
  }))
  app.get('*', function (req, res, next) {
    if (!serverBundle) {
      return res.send('waiting for complie, refresh later')
    }
    getTemplate().then(template => {
      return serverRender(serverBundle, template, req, res)
    }).catch(next)
  })
}