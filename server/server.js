const express = require('express')
const serverRender = require('./util/server-render')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const fs = require('fs') // 文件模块
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.use(bodyParser.json()) // 处理请求体是 json格式 获取req.body
app.use(bodyParser.urlencoded({ extended: false })) // 处理请求体是 formdata格式    获取req.body
app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid', // cookie id
  resave: false, // 是否每次请求都获取行的session
  saveUninitialized: false,
  secret: 'react node class' // 添加字符串加密cookie?
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use('/api/user', require('./util/handle-login.js'))
app.use('/api', require('./util/proxy.js'))

if (!isDev) { // 若是开发环境 server不同
  const serverEntry = require('../dist/server-entry') // 打包时的commonjs2   expport default <App/> 使用 serverRender 方法不需要.fefault
  let template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf8')  // 同步读取并转为utf8字符串 index.html 是插件HTMLPulgin 通过 tempalte生成的
  app.use('/public', express.static(path.join(__dirname, '../dist'))) // 设置静态文件地址， 就是当请求的是public的时候就是请求静态文件，会去dist目录下去寻找
  app.get('*', function (req, res, next) {
    // const appString = ReactSSR.renderToString(serverEntry) // 将react 的jsx文件转化为dom字符串
    serverRender(serverEntry, template, req, res).catch(next)
    // res.send(template.replace('<!-- app -->', appString))
  })
} else {
  const devStatic = require('./util/dev-static')
  devStatic(app)
}

app.use(function (error, req, res, next) { // 统一处理错误
  console.log(error)
  res.status(500).send(error)
})

app.listen(3333, function () {
  console.log('server is listen 3333')
})