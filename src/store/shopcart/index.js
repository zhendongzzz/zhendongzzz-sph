// 导入 API 模块下的请求函数
import { reqCartList, reqDeleteCartGood, reqUpdateChecked } from '@/api/index.js'
// detail 模块的小仓库
const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  // 获取购物车列表数据
  async getCartList({ commit }) {
    const result = await reqCartList()
    if (result.code === 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除某个产品
  async reqDeleteCart(skuId) {
    const result = await reqDeleteCartGood(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 更新勾选状态
  async updateCheckedById({ skuId, isChecked }) {
    const result = await reqUpdateChecked(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 删除选中全部商品
  deleteAllCheckedGood({ dispatch, getters }) {
    const cartInfoList = getters.cartInfoList
    const promiseAll = []
    cartInfoList.forEach((element) => {
      const promise = element.isChecked === 1 ? dispatch('reqDeleteCart', element.skuId) : ''
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  },
  // 全选按钮
  AllChecked({ dispatch, getters }, checked) {
    const cartInfoList = getters.cartInfoList
    const promiseAll = []
    cartInfoList.forEach((element) => {
      const promise = dispatch('updateCheckedById', `{${element.skuId},${checked}}`)
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
const getters = {
  cartInfoList(state) {
    return state.cartList[0].cartInfoList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
