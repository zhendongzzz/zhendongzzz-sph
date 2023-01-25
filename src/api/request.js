// 对 axios 进行二次封装
import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store'
const request = axios.create({
  // 配置对象
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 请求头添加一个字段(userTempId) :后台已经配置好
  if (store.state.detail.uuidToken) {
    config.headers.userTempId = store.state.detail.uuidToken
  }
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nProgress.start()
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    nProgress.done()
    return res.data
  },
  () => {
    // 服务器响应失败的回调函数
    return Promise.reject(new Error('faile'))
  }
)
export default request
