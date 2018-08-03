// 处理所有请求cnodejsde 接口
const axios = require('axios')
const querystring = require('query-string')

const baseUrl = 'http://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  const path = req.path
  const user = req.session.user || {}
  const needAccessToken = req.query.needAccessToken

  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }
  console.log('this is proxy')
  const query = Object.assign({}, req.query, {
    accesstoken: (needAccessToken && req.method === 'GET')? user.accessToken: ''
  })

  if (query.needAccessToken) delete query.needAccessToken

  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: querystring.stringfy(Object.assign({}, req.body, {
      accesstoken: (needAccessToken && req.method === 'POST')? usre.accessToken: ''
    })), // 就是post请求的boyd ，body 转化为cnode 需要的类型   未使用querystring是 {'accessToken': '123'}    使用后是 'accessToken=123'
    headers: { // cnode api的问题， 统一一下
      'Content-Type': 'aapplication/x-www-form-urlencoded' // 发起请求的 类型
    }
  }).then(resp => {
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      console.log('this .sss')
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    if (err.response) {
      console.log('response')
      res.status(501).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}