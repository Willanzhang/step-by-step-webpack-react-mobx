import axios from 'axios'

const baseUrl = process.env.API_BASE || ''
const parseUrl = (url, params) => {
  const str = Object.keys(params).reduce((result, key) => {
    const add = `result${key}=${params[key]}&`
    return add
  }, '')
  return `${baseUrl}/api${url}?${str.substr(0, str.length - 1)}`
}

export const get = (url, params) => new Promise((resolve, reject) => {
  axios.get(parseUrl(url, params))
    .then(res => {
      const { data } = res
      if (data && data.success === true) {
        resolve(data)
      } else {
        reject(data)
      }
    }).catch(reject)
})
export const post = (url, params, data) => new Promise((resolve, reject) => {
  axios.post(parseUrl(url, params), data)
    .then(res => {
      const { datas } = res
      if (datas && datas.success === true) {
        resolve(datas)
      } else {
        reject(datas)
      }
    }).catch(reject)
})
