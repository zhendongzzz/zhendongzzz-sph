// import store from '@/store'
import store from '@/store'
import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // 给路由跳转添加滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    if (to.name === 'detail') {
      return { top: 0 }
    }
  }
})
// 全局导航前置守卫
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  // const name = store.state.user.userInfo.name
  // 用户登录
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else next()
    if (!name) {
      try {
        // 登录了没有用户信息
        // 重新获取
        await store.dispatch('getUserInfo')
      } catch (error) {
        // 获取失败：token 失效
        // 清除token
        await store.dispatch('userLogout')
        next('/login')
      }
    }
  } else {
    // 用户未登录
    if (to.path === '/center' || to.path === '/center/myorder' || to.path === '/center/grouporder ' || to.path === '/pay' || to.path === '/trade' || to.path === '/paysuccess') {
      next('/login?redirect=' + to.path)
    } else {
      next()
    }
  }
})
export default router
