import { createApp } from 'vue'
import App from './App.vue'
// 引入 element ui 样式文件
import 'element-plus/dist/index.css'
// 引入mockServer.js
import '@/mock/mockServe.js'
import router from './router'

// 引入仓库
import store from './store'
// 由于需要多次使用轮播图，所以将其全局导入
// // 这里导入了 swiper的所有相关css
// import 'swiper/css/bundle'

// 图片懒加载
import VueLazyload from 'vue-lazyload'

// 优化：按需引入 swiper 组件所需要的 css
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// 导入 api 接口
import * as API from '@/api'
// 导入全局组件
import MyTypeNav from '@/components/TypeNav/MyTypeNav.vue'
import MyPagination from '@/components/Pagination/MyPagination.vue'
const app = createApp(App)
app.component('MyTypeNav', MyTypeNav).component('MyPagination', MyPagination).use(router).use(store).mount('#app')
app.config.globalProperties.$API = API

const loadimage = require('@/assets/images/bb.gif')
const errorimage = require('@/assets/images/bb.gif')
app.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
})
