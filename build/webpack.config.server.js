const path = require('path') // 使用path

module.exports = {
  target: 'node',  // 打包后的文件是使用在什么地方
  entry: {
    app: path.join(__dirname, '../client/server-entry.js') // 入口 文件 利用path使用绝对路径 避免发生错误（环境）
  },
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public', // 静态资源引用的路径 区分静态资源请求和api 以及配置nginx 图片部署到cdn上处理等 ---/public/app.hash.js
    libraryTarget: 'commonjs2'  // 打包后的js的模块方案  'amd'-requirejs  'cmd'-seajs 'umd'  'commonjs'    
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre', // pre babel-loader之前先执行 eslint-loader
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ] // 不编译 node_modules 文件下的js 和 jsx 文件，
      },
      {
        test: /.(jsx|js)$/,   // 需要使用loader 的文件
        loader: 'babel-loader',
        exclude: path.join(__dirname, '../node_modules') // 不编译 node_modules 文件下的js 和 jsx 文件，
        // include: path.join(__dirname, '../client') // 只编译 clinet 文件下的js 和 jsx 文件，
      }
    ]
  }
}