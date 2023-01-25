// 导入 API 模块下的请求函数
import { reqcategoryList, reqGetBannerList, reqFloorList } from '@/api/index.js'
// home 模块的小仓库
const state = {
  categoryList: [],
  cateBannerList: [],
  cateFloorList: []
}
const mutations = {
  CATEGORY(state, categoryList) {
    state.categoryList = categoryList
  },
  CATELIST(state, cateBannerList) {
    state.cateBannerList = cateBannerList
  },
  CATEFLOOR(state, cateFloorList) {
    state.cateFloorList = cateFloorList
  }
}
const actions = {
  async categoryList(context) {
    const result = await reqcategoryList()
    if (result.code === 200) {
      context.commit('CATEGORY', result.data)
    }
  },
  async getBannerList(context) {
    const result = await reqGetBannerList()
    if (result.code === 200) {
      context.commit('CATELIST', result.data)
    }
  },
  async getFloorList(context) {
    const result = await reqFloorList()
    if (result.code === 200) {
      context.commit('CATEFLOOR', result.data)
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
