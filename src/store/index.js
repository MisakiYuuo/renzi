import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)
const test = {
  namespaced: true, // 添加命名空间，防止重名调用
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  }
}
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    test
  },
  // 定义计算属性
  getters: {
    showCount: state => 'count=' + state.count,
    ...getters
  },
  state: {
    count: 0,
    age: 20
  },
  mutations: {
    add(state) {
      state.count++
    },
    addNum(state, num) {
      state.count += num
    }
  },
  // 异步方法
  actions: {
    addSync(context) {
      // context === $store
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    },
    // 传参
    addNsync(context, num) {
      // context === $store
      setTimeout(() => {
        context.commit('addNum', num)
      }, 1000)
    }
  }
})

export default store
