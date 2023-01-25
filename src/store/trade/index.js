// trade 模块
import { reqTrade } from '@/api'

const state = {
  trade: {}
}
const mutations = {
  GETTRADE(state, data) {
    state.trade = data
  }
}
const actions = {
  async getTrade({ commit }) {
    const result = await reqTrade()
    if (result.code === 200) {
      commit('GETTRADE', result.data)
    } else {
      return Promise.reject(new Error('获取失败'))
    }
  }
}
const getters = {
  userAddressList(state) {
    return state.trade.userAddressList
  },
  detailArrayList(state) {
    return state.trade.detailArrayList
  },
  trade(state) {
    return state.trade
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
