import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)
const test = {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken: (state) => {
      state.token = 'abc'
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
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count++
    }
  },
  getters: {
    showCount: (state) => 'count=' + state.count,
    ...getters
  }
})

export default store
