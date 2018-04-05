import * as firebase from 'firebase'

export default {
  strict: true,
  namespaced: true,
  state: {
    socialButtons: [
      {
        name: 'Facebook',
        color: '#3b5998',
        icons: 'ion-social-facebook-outline, material:md-facebook-box'
      },
      {
        name: 'Google+',
        color: '#d62d20',
        icons: 'ion-social-google-outline, material:md-google'
      },
      {
        name: 'Twitter',
        color: '#0084b4',
        icons: 'ion-social-twitter-outline, material:md-twitter'
      }
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
    dispatchLogUp ({commit, dispatch, state}, index) {
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
      const mySocialButtons = state.socialButtons
      let name = mySocialButtons[index].name
      console.log('la red social elegida es: ' + name)
      switch (name) {
        case 'Facebook' : {
          let provider = new firebase.auth.FacebookAuthProvider()
          // provider.addScope()
          dispatch('socialSignUp', provider)
          break
        }
        case 'Google' : {
          let provider = new firebase.auth.GoogleAuthProvider()
          // provider.addScope()
          dispatch('socialSignUp', provider)
          break
        }
        case 'Twitter' : {
          let provider = new firebase.auth.TwitterAuthProvider()
          // provider.addScope()
          dispatch('socialSignUp', provider)
          break
        }
      }
    },
    // Log Up común a todos
    socialSignUp ({commit}, provider) {
      // provider.addScope('public_profile')
      firebase.auth().useDeviceLanguage()
      // firebase.auth().signInWithPopup(provider) // Utilizamos esta forma de acceso en producción
      firebase.auth().signInWithRedirect(provider)
      firebase.auth().getRedirectResult()
        .then(
          result => {
            commit('shared/setLoading', false, { root: true })
            if (result.credential) {
              // Accedemos al Facebook Access Token, ahora podemos utilizarlo para acceder a la Facebook API
              let token = result.credential.accessToken
              console.log('El token es: ' + token)
            }
            // Informacion del user
            const newUser = {
              id: result.user.uid
            }
            commit('user/setUser', newUser, { root: true })
            console.log(newUser)
          }
        )
        .catch(
          error => {
            commit('shared/setLoading', false, { root: true })
            // commit('setError', error)
            let errorCode = error.code
            commit('authError', errorCode)
            console.log(errorCode)
          }
        )
    }
  }
}
