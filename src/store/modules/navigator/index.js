export default {
  strict: true,
  namespaced: true,
  state: {
    stack: [],
    options: {}
  },
  getters: {
    pageStack (state) {
      return state.stack
    },
    options (state) {
      return state.options
    }
  },
  mutations: {
    push (state, page) {
      state.stack.push(page) // Añade la página al final de la  pila
    },
    pop (state) {
      if (state.stack.length > 1) {
        state.stack.pop() // Elimina la última página de la pila
      }
    },
    replace (state, page) {
      state.stack.pop()
      state.stack.push(page)
    },
    reset (state, page) {
      state.stack = [page || state.stack[0]]
    },
    options (state, newOptions = {}) {
      state.options = newOptions
    }
  },
  actions: {
  }
}
