const ReactDomServer = require('react-dom/server')
const path = require('path')
const bootstrap = require('react-async-bootstrapper') // 新版本不需要.defaut
const proxy = require('http-proxy-middleware')
const ejs = require('ejs')
const Helmet = require('react-helmet').default
const serialize = require('serialize-javascript') // 序列化javascript对象


const SheetsRegistry = require('react-jss').SheetsRegistry
const create = require('jss').create
const preset = require('jss-preset-default').default
const createMuiTheme = require('@material-ui/core/styles').createMuiTheme
const createGenerateClassName = require('@material-ui/core/styles').createGenerateClassName
const colors = require('@material-ui/core/colors')

// import  {
//   MuiThemeProvider,
//   createMuiTheme,
//   createGenerateClassName,
// } from '@material-ui/core/styles' // 其实服务端不推介使用 babel 编译对性能有影响

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default

    const routerContext = {}
    const stores = createStoreMap()

    const theme = createMuiTheme({
      palette: {
        primary: colors.lightBlue,
        accent: colors.pink,
        type: 'light'
      }
    })
    const sheetsRegistry = new SheetsRegistry()
    const sheetsManager = new Map()

    const generateClassName = createGenerateClassName()

    const app = createApp(stores, routerContext, req.url, sheetsRegistry, generateClassName, sheetsManager, theme)


    bootstrap(app).then(() => {
      if (routerContext.url) {
        // 当有 routerContext.url将跳转到我们需要的路径
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      const helmet = Helmet.rewind() // 为了添加title meta 方便seo
      const state = getStoreState(stores)
      const content = ReactDomServer.renderToString(app)
      // 在有redict的情况下会有 routerContext.url 这部分内容要在renderToString 之后才行 使用bootstrap  if (routerContext.url)可以放在提前？
      // if (routerContext.url) {
      //   // 当有 routerContext.url将跳转到我们需要的路径
      //   res.status(302).setHeader('Location', routerContext.url)
      //   res.end()
      //   return
      // }
      console.log(helmet.title.toString())
      const html = ejs.render(template, {
        appString: content, // 获取html
        initialState: serialize(state), // 同步store 内容
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        link: helmet.link.toString(),
        style: helmet.style.toString(),
        css: sheetsRegistry.toString()
      })
      res.send(html)
      resolve()
      // res.send(template.replace('<!-- app -->', content)) // 使用ejs后不需要这样做了
    }).catch(reject)
  })
}