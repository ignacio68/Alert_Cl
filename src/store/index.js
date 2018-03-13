import Vue from 'vue'
import Vuex from 'vuex'

import navigator from './modules/navigator'
import shared from './modules/shared'
import user from './modules/user'
import signup from './modules/signup'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    navigator,
    shared,
    user,
    signup
  }
})
