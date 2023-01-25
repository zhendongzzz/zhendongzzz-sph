// 对 axios 进行二次封装
import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
const request = axios.create({
  // 配置对象
  baseURL: '/mock',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
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
