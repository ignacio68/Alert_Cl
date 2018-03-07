import Vue from 'vue'
import Vuex from 'vuex'

import navigator from './modules/navigator'
import shared from './modules/shared'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    navigator,
    shared
  }
})
