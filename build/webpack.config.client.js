const path = require('path') // 使用path
const HTMLPlugin = require('html-webpack-plugin') // 生成html 并且将output 引入
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const config = {
  entry: {
    app: path.join(__dirname, '../client/app.js') // 入口 文件 利用path使用绝对路径 避免发生错误（环境）
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/' // 静态资源引用的路径 区分静态资源请求和api 以及配置nginx 图片部署到cdn上处理等 ---/public/app.hash.js   必须是'/public/'（注意后面的斜杠）否则开发环境热更新会有问题
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
  },
  performance: {
    hints: false
  },
  plugins: [
    new HTMLPlugin({ // 生成html 并且将output 引入
      template: path.join(__dirname, '../client/template.html')
    })
  ]
}

if (isDev) {
  config.entry = {  // dev环境热加载需要改变entry
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0', // 使用0.0.0.0 可以同时使用127.0.0.1 localhost IP地址
    port: '8888', // 端口
    contentBase: path.join(__dirname, '../dist'), // 静态文件目录  等于dev服务是在dist目录下启动的    他的机制是寻找是否有dist目录  当存在dist目录 请求资源会出问题
    hot: true,
    overlay: { // 有任何错误   overlay：覆盖层
      // errors 弹出
      errors: true
    },
    publicPath: '/public/', // 等于 dev 服务中  访问所有的静态路径都要在路径前加上public
    historyApiFallback: { // 指定index 是
      index: '/public/index.html' // 所有404的请求全部返回 index.html 自己处理
    },
    proxy: {
      '/api': 'http://localhost:3333' // 所有带/api 的请求都会代理请求到 server端口
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin()) // dev环境热加载使用
}
module.exports = config