import * as firebase from 'firebase'

export default {
  strict: true,
  namespaced: true,
  state: {
    user: null
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
    /**
     * Nuevo Usuario
     */
    signUserUp ({commit}, user) {
      console.log('Estoy en signUserUp')
      commit('shared/setLoading', true)
      commit('shared/clearError')
      /* Crea el usuario en Firebase */
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(
          user => {
            commit('shared/setLoading', false)
            const newUser = {
              // Añadimos los datos del usuario prporcionados por Firebase
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photo: user.photoUrl
            }
            commit('setUser', newUser) // Llamamos a la mutacion 'setUser' para añadir nuevas propiedades al user
            console.log('Hay un nuevo usuario: ' + newUser.email)
          }
        )
        .catch(
          error => {
            console.log('Estoy en el catch de errores de signUserUp')
            commit('shared/setLoading', false)
            commit('shared/setError', error)
          }
        )
    },
    /**
     * Log In de Usuario
     */
    signUserIn ({commit}, user) {
      commit('shared/setLoading', true)
      commit('shared/clearError')
      /* Comprueba que el usuario existe en Firebase */
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(
          user => {
            commit('shared/setLoading', false)
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('shared/setLoading', false)
            commit('shared/setError', error)
            console.log(error)
          }
        )
    },
    /**
     * Log Out de Usuario
     */
    signUserOut ({commit}) {
      commit('shared/setLoading', true)
      commit('shared/clearError')
      firebase.auth().signOut()
        .then(
          result => {
            commit('shared/setLoading', false)
            commit('shared/clearUser')
            commit('social/clearSocialButtonsVisible')
          }
        )
        .catch(
          error => {
            commit('shared/setLoading', false)
            commit('shared/setError', error)
            console.log(error)
          }
        )
    },
    /**
     * Comprueba si hay algún usuario conectado
     */
    isActiveUser ({commit}) {
      /**
      firebase.auth().onAuthStateChanged(
        user => {
          if (user) {
            // commit('navigator/push', page)
            console.log(activeUser.email + ' está conectado')
          } else {
            console.log('No hay ningún usuario conectado')
          }
        }
      )
      */
      const activeUser = firebase.auth().currentUser
      if (activeUser != null) {
        // commit('navigator/push', page)
        console.log(activeUser.email + ' está conectado')
      } else {
        console.log('No hay ningún usuario conectado')
      }
    }
  }
}
