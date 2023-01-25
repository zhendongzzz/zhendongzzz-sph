import { reqPhoneCode, reqUserRegister, reqLogin, reqUserInfo, reqLogout } from '@/api'
// 登陆注册 模块小仓库
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  USERLOGIN(state, token) {
    state.token = token
    setToken(token)
  },
  USERINFO(state, data) {
    state.userInfo = data
  },
  CLEAR(state) {
    removeToken()
    state.userInfo = {}
    state.token = ''
  }
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    const result = await reqPhoneCode(phone)
    if (result.code === 200) {
      return result.data
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 用户注册
  async userRegister({ commit }, data) {
    const result = await reqUserRegister(data)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('注册失败'))
    }
  },
  // 用户登录
  async userLogin({ commit }, data) {
    const result = await reqLogin(data)
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 获取用户信息(token)
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('USERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 用户退出
  async userLogout({ commit }) {
    const result = await reqLogout()
    if (result.code === 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
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
