// trade 模块
import { reqOrder } from '@/api'

const state = {
  records: []
}
const mutations = {
  GETORDER(state, data) {
    state.records = data
  }
}
const actions = {
  async getOrder({ commit }, { page, limit }) {
    const result = await reqOrder(page, limit)
    if (result.code === 200) {
      commit('GETORDER', result.data)
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
}
const getters = {
  records(state) {
    return state.records.records
  },
  myOrder(state) {
    return state.records
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
