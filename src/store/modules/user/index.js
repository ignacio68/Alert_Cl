export default {
  strict: true,
  namespaced: true,
  state: {
    user: null // el usuario inicial siempre es nulo
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    setUser (state, newUser) {
      state.user = newUser // Añade a user las propiedades del usuario registrado
    },
    clearUser (state) {
      state.user = null
    }
  },
  actions: {
  }
}
