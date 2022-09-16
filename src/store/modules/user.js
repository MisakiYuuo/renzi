import { getUserBaseInfoAPI, getUserInfoAPI, loginAPI } from '@/api'
import { Message } from 'element-ui'
import { getToken, removeToken, setToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    // 保存到token和cookie中
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    // 清除token
    removeToken(state) {
      // 清空token
      state.token = ''
      // 清除cookie
      removeToken()
    },
    // 获取个人信息
    getUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    // 清除个人信息
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    // 登录
    async login({ commit }, value) {
      const token = await loginAPI(value)
      commit('setToken', token)
      Message.success('登录成功')
    },
    // 退出登录
    logout({ commit }) {
      commit('removeToken')
      commit('removeUserInfo')
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      const u = await getUserInfoAPI()
      const b = await getUserBaseInfoAPI(u.userId)
      commit('getUserInfo', { ...u, ...b })
    }
  }
}
