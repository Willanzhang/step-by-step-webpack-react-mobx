const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs') // 内存读写模块
const ReactDomServer = require('react-dom/server')
const path = require('path')
const bootstrap = require('react-async-bootstrapper') // 新版本不需要.defaut
const proxy = require('http-proxy-middleware')
const ejs = require('ejs')
const serialize = require('serialize-javascript') // 序列化javascript对象
const serverConfig = require('../../build/webpack.config.server')

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

const Module = module.constructor // 利用Module创建一个新的module
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
  const m = new Module()
  m._compile(bundle, 'server-entry.js') // 将bundle（string）转化为 export default 模块形式 用Module解析 这个 srting  成为 javascript   !必须制定module的名字 'server-entry.js'
  serverBundle = m.exports.default // 注意！
  createStoreMap = m.exports.createStoreMap
})

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = function (app) {
  app.use('/public', proxy({ // 这里没法设置静态文件地址 因为硬盘上并没有， 只能通过代理简介设置静态文件地址
    target: 'http://localhost:8888'
  }))
  app.get('*', function (req, res) {
    getTemplate().then(template => {
      const routerContext = {}
      const stores = createStoreMap()
      const app = serverBundle(stores, routerContext, req.url)
      bootstrap(app).then(() => {
        if (routerContext.url) {
          // 当有 routerContext.url将跳转到我们需要的路径
          res.status(302).setHeader('Location', routerContext.url)
          res.end()
          return
        }
        const state = getStoreState(stores)
        const content = ReactDomServer.renderToString(app)
        // 在有redict的情况下会有 routerContext.url 这部分内容要在renderToString 之后才行 使用bootstrap  if (routerContext.url)可以放在提前？
        // if (routerContext.url) {
        //   // 当有 routerContext.url将跳转到我们需要的路径
        //   res.status(302).setHeader('Location', routerContext.url)
        //   res.end()
        //   return
        // }
        const html = ejs.render(template, {
          appString: content,
          initialState: serialize(state)
        })
        res.send(html)
        // res.send(template.replace('<!-- app -->', content)) // 使用ejs后不需要这样做了
      })
    })
  })
}