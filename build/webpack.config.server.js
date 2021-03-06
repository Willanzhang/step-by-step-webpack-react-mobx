const path = require('path') // 使用path
const webpack = require('webpack')
const baseConfig = require('./webpack.base')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge(baseConfig, {
  target: 'node',  // 打包后的文件是使用在什么地方
  entry: {
    app: path.join(__dirname, '../client/server-entry.js') // 入口 文件 利用path使用绝对路径 避免发生错误（环境）
  },
  externals: Object.keys(require('../package.json').dependencies),
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2'  // 打包后的js的模块方案  'amd'-requirejs  'cmd'-seajs 'umd'  'commonjs'
  },
  plugins: [
    new webpack.DefinePlugin({ // 定义变量
      'process.env.API_BASE': '"http://127.0.0.1:3000"'
    })
  ]
})
console.log(process.env.API_BASE, 'process.env.API_BASE')
