import * as firebase from 'firebase'

export default {
  strict: true,
  namespaced: true,
  state: {
    socialButtons: [
      { name: 'Email', socialLogIn: 'onEmailIn', isVisible: false },
      { name: 'Facebook', socialLogIn: 'onFacebookIn', isVisible: false },
      { name: 'Google +', socialLogIn: 'onGoogleIn', isVisible: false },
      { name: 'Twitter', socialLogIn: 'onTwitterIn', isVisible: false }
    ],
    socialButtonsVisible: [],
    errorMessage: ''
  },
  getters: {
    socialButtons (state) {
      return state.socialButtons
    },
    socialButtonsVisible (state) {
      return state.socialButtonsVisible
    }
  },
  mutations: {
    // Cambia el estado de visibilidad de los botones
    isVisible (state, index) {
      console.log('la aplicación es ' + state.socialButtons[index].name)
      state.socialButtons[index].isVisible = !state.socialButtons[index].isVisible
      console.log('la aplicación es visible? ' + state.socialButtons[index].isVisible)
    },
    // Agregamos al array 'socialButtonsVisible' los botones visibles
    socialButtonsVisible (state) {
      for (let i = 0, len = state.socialButtons.length; i < len; i++) {
        if (state.socialButtons[i].isVisible === true) {
          state.socialButtonsVisible.push(state.socialButtons[i])
        }
      }
    },
    // Reseteamos socialButtons.isVisible a "false"
    resetSocialButtons (state) {
      for (let i = 0, len = state.socialButtons.length; i < len; i++) {
        state.socialButtons[i].isVisible = false
        console.log(state.socialButtons[i].name + ' es ' + state.socialButtons[i].isVisible)
      }
    },
    // Reseteamos el array socialButtonsVisible
    clearSocialButtonsVisible (state) {
      state.socialButtonsVisible = []
    },
    /**
     * Manejo de los errores de autenticación
     * Terminar de completar, internacionalizar y sacar a otro módulo
      */
    authError (state, errorCode) {
      switch (errorCode) {
        case 'auth/credential-already-in-use' :
          state.message = 'Ya existe un usuario con esta cuenta'
          break
        case 'auth/email-already-in-use' :
          state.message = 'Ya existe un usuario con el mismo email'
          break
        case 'auth/operation-not-allowed' :
          state.message = 'Este tipo de cuentas no esta habilitada'
          break
        default :
          state.message = errorCode
      }
      console.log('el error en la autorización es:' + state.message)
    }
  },
  actions: {
    /**
     * Acciones para autenticar segun el social login elegido
     * Posibilidad de separalo en módulos para mejorar la claridad
     * del software
     */
    onEmailIn ({commit}) {
      console.log('Estoy en onEmailIn')
    },
    onFacebookIn ({commit}) {
      console.log('Estoy en onFacebookIn')
      commit('shared/setLoading', true)
      commit('shared/clearError')
      const provider = new firebase.auth.FacebookAuthProvider()
      this.socialLogUp(provider)
    },
    onGoogleIn ({commit}) {
      console.log('Estoy en onGoogleIn')
      commit('setLoading', true)
      commit('clearError')
      const provider = new firebase.auth.GoogleAuthProvider()
      // provider.addScope()
      this.socialLogUp(provider)
    },
    onTwitterIn ({commit}) {
      console.log('Estoy en onTwitterIn')
      commit('setLoading', true)
      commit('clearError')
      const provider = new firebase.auth.TwitterAuthProvider()
      // provider.addScope ()
      this.socialLogUp(provider)
    },
    // Log Up común a todos
    socialLogUp ({commit}, provider) {
      provider.addScope('public_profile')
      firebase.auth().useDeviceLanguage()
      firebase.auth().signInWithPopup(provider) // Utilizamos esta forma de acceso en producción
      // firebase.auth().signInWithRedirect(provider)
      // firebase.auth().getRedirectResult()
        .then(
          result => {
            commit('shared/setLoading', false)
            if (result.credential) {
              // Accedemos al Facebook Access Token, ahora podemos utilizarlo para acceder a la Facebook API
              let token = result.credential.accessToken
              console.log('El token es: ' + token)
            }
            // Informacion del user
            const newUser = {
              name: result.user.displayName,
              email: result.user.email,
              id: result.user.uid
            }
            commit('user/setUser', newUser)
            console.log(newUser)
          }
        )
        .catch(
          error => {
            commit('shared/setLoading', false)
            // commit('setError', error)
            let errorCode = error.code
            commit('authError', errorCode)
            console.log(errorCode)
          }
        )
    }
  }
}
