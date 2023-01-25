// 导入路由组件
// 路由懒加载
// import MyHome from '@/pages/Home/MyHomeVue.vue'
import MyLogin from '@/pages/Login/index.vue'
import MyRegister from '@/pages//Register/index.vue'
import MySearch from '@/pages/Search/index.vue'
import MyDetail from '@/pages/Detail/index.vue'
import MyAddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import MyShopCart from '@/pages/ShopCart/index.vue'
import MyTrade from '@/pages/Trade/index.vue'
import MyPay from '@/pages/Pay/index.vue'
import PaySuccess from '@/pages/PaySuccess/index.vue'
import MyCenter from '@/pages//Center/index.vue'
// 导入二级路由组件
import MyOrder from '@/pages/Center/MyOrder/MyOrder.vue'
import GroupOrder from '@/pages/Center/groupOrder/GroupOrder.vue'
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('@/pages/Home/MyHomeVue.vue'), meta: { show: true } },
  { path: '/login', component: MyLogin, meta: { show: false } },
  { path: '/register', component: MyRegister, meta: { show: false } },
  {
    path: '/detail/:skuId',
    component: MyDetail,
    meta: { show: true },
    name: 'detail'
  },
  {
    // 指定参数 可传递或者不传递
    path: '/search/:keyword?',
    component: MySearch,
    meta: { show: true },
    name: 'search'
    // props: true
  },
  {
    path: '/addcartsuccess',
    component: MyAddCartSuccess,
    name: 'addcartsuccess',
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.name === 'detail') next()
      else return next('/')
    }
  },
  {
    name: 'shopcart',
    path: '/shopcart',
    meta: { show: true },
    component: MyShopCart
  },
  {
    path: '/trade',
    meta: { show: true },
    component: MyTrade,
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart') next()
      else return next('/')
    }
  },
  {
    path: '/pay',
    meta: { show: true },
    component: MyPay,
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') next()
      else return next('/')
    }
  },
  {
    path: '/paysuccess',
    meta: { show: true },
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if (from.path === '/pay') next()
      else return next('/')
    }
  },
  {
    path: '/center',
    redirect: '/center/myorder',
    meta: { show: true },
    component: MyCenter,
    children: [
      {
        path: 'myorder',
        component: MyOrder
      },
      {
        path: 'grouporder',
        component: GroupOrder
      }
    ]
  }
]

export default routes
