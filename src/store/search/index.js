import { reqSearchInfo } from '@/api'
// search 模块小仓库
const state = {
  searchList: {}
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  // 获取 search 模块数据
  async getSearchList(context, searchParams) {
    const result = await reqSearchInfo(searchParams)
    if (result.code === 200) {
      context.commit('GETSEARCHLIST', result.data)
    }
  }
}
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
