// 导入 API 模块下的请求函数
import { reqGoodsInfo, reqShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'
// detail 模块的小仓库
const state = {
  goodInfo: {},
  uuidToken: getUUID()
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const actions = {
  async getGoodInfo({ commit }, skuId) {
    const result = await reqGoodsInfo(skuId)
    if (result.code === 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  async getShopCart({ commit }, { skuId, skuNum }) {
    const result = await reqShopCart(skuId, skuNum)
    if (result.code === 200) return 'ok'
    else return Promise.reject(new Error('failed'))
  }
}
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
