export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    stack: [],
    options: {},
    index: 1 // Tabbar
  },
  getters: {
    pageStack (state) {
      return state.stack
    },
    options (state) {
      return state.options
    },
    index (state) {
      return state.index
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
    },
    // Tabbar
    set (state, index) {
      state.index = index
    }
  },
  actions: {
  }
}
