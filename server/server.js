const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs') // 文件模块
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const app = express()


if (!isDev) { // 若是开发环境 server不同
  const serverEntry = require('../dist/server-entry').default // 打包时的commonjs2   expport default <App/>
  let template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')  // 同步读取并转为utf8字符串 index.html 是插件HTMLPulgin 通过 tempalte生成的
  app.use('/public', express.static(path.join(__dirname, '../dist'))) // 设置静态文件地址， 就是当请求的是public的时候就是请求静态文件，会去dist目录下去寻找
  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry) // 将react 的jsx文件转化为dom字符串
    res.send(template.replace('<!-- app -->', appString))
  })
} else {
  const devStatic = require('./util/dev-static')
  devStatic(app)
}
app.listen(3333, function () {
  console.log('server is listen 3333')
})