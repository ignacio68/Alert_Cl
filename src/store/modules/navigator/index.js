export default {
  strict: true,
  namespaced: true,
  state: {
    stack: [],
    options: {}
  },
  mutations: {
    push (state, page) {
      state.stack.push(page) // Añade la página al final de la  pila
      console.log('Añadida la página' + page)
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
  getters: {
    pageStack (state) {
      return state.stack
    },
    options (state) {
      return state.options
    }
  }
}
