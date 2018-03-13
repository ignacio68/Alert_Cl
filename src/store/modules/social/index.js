import * as firebase from 'firebase'

export default {
  strict: true,
  namespaced: true,
  state: {
    socialButtons: [
      { name: 'Email', socialLogIn: 'onEmailIn' },
      { name: 'Facebook', socialLogIn: 'onFacebookIn' },
      { name: 'Google', socialLogIn: 'onGoogleIn' },
      { name: 'Twitter', socialLogIn: 'onTwitterIn' }
    ],
    errorMessage: ''
  },
  getters: {
    socialButtons (state) {
      return state.socialButtons
    }
  },
  mutations: {
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
     * Posibilidad de separarlo en módulos para mejorar la claridad
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
      this.socialSignUp(provider)
    },
    onGoogleIn ({commit}) {
      console.log('Estoy en onGoogleIn')
      commit('setLoading', true)
      commit('clearError')
      const provider = new firebase.auth.GoogleAuthProvider()
      // provider.addScope()
      this.socialSignUp(provider)
    },
    onTwitterIn ({commit}) {
      console.log('Estoy en onTwitterIn')
      commit('setLoading', true)
      commit('clearError')
      const provider = new firebase.auth.TwitterAuthProvider()
      // provider.addScope ()
      this.socialSignUp(provider)
    },
    // Log Up común a todos
    socialSignUp ({commit}, provider) {
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
