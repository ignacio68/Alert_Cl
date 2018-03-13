import Vue from 'vue'
import Vuex from 'vuex'

import navigator from './modules/navigator'
import shared from './modules/shared'
import user from './modules/user'
<<<<<<< HEAD
import signup from './modules/signup'
=======
import social from './modules/social'
>>>>>>> 5ce95485ab29a63a255c41847c834f63591ce834

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    navigator,
    shared,
    user,
<<<<<<< HEAD
    signup
=======
    social
>>>>>>> 5ce95485ab29a63a255c41847c834f63591ce834
  }
})
