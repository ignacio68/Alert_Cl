import * as firebase from 'firebase'

// import 'firebase/auth'

import HomePage from '../../../pages/HomePage'
import SignUp from '../../../pages/User/SignUp'
// const fb = require('../../../components/Firebase/firebaseConfig')

export default {
  strict: true,
  namespaced: true,
  state: {
    user: null // el usuario inicial siempre está vacio
  },
  getters: {
    user (state) {
      return state.user // devuelve el usuario desde state
    }
  },
  mutations: {
    setUser (state, newUser) {
      state.user = newUser // Añade a user las propiedades del usuario registrado
      console.log('El id del usuarios es: ' + state.user.id)
    },
    clearUser (state) {
      state.user = null // resetea el user
    }
  },
  actions: {
  	/* Comando de prueba */
	  signUserUpKK ({commit}, user) {
	    console.log('Estoy en signUserUp')
			commit('shared/setLoading', true, { root: true })
	    commit('shared/setActionPass', false, { root: true })
	    commit('shared/clearError', null, { root: true })
	    /* Crea el usuario en Firebase */
	    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
	      .then(
	        user => {
	          commit('shared/setLoading', false, { root: true })
	          commit('shared/setActionPass', true, { root: true })
	          const newUser = {
	            // Añadimos los datos del nuevo usuario
	            id: user.uid,
	            name: user.displayName,
	            email: user.email,
	          }
	          commit('setUser', newUser) // Llamamos a 'setUser' para añadir nuevas propiedades al user
	          console.log('Hay un nuevo usuario: ' + newUser.email)
	          //commit('navigator/push', HomePage, { root: true })
	        }
	      )
	      .catch(
	        error => {
	          console.log('Estoy en el catch de errores de signUserUp')
	          commit('shared/setLoading', false, { root: true })
	          commit('shared/setActionPass', false, { root: true })
	          commit('shared/setError', error, { root: true })
	        }
	      )
	  },
    /**
    	* Nuevo Usuario
    	*/
    signUserUp ({commit}, user) {
      console.log('Estoy en signUserUp')
  		commit('shared/setLoading', true, { root: true })
      commit('shared/setActionPass', false, { root: true })
      commit('shared/clearError', null, { root: true })
  
      /* Crea el usuario en Firebase */
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(
          user => {
            commit('shared/setLoading', false, { root: true })
            commit('shared/setActionPass', true, { root: true })
            const newUser = {
              // Añadimos los datos del nuevo usuario
              id: user.uid,
              name: user.displayName,
              email: user.email,
            }
            commit('setUser', newUser) // Llamamos a 'setUser' para añadir nuevas propiedades al user
            console.log('Hay un nuevo usuario: ' + state.user.id)
  
            /* Cramos el objeto ActionCodeSettings que proporciona instrucciones a Firebase*/
            const actionCodeSettings = {
            	// URL you want to redirect back to. The domain (www.example.com) for this
            	// URL must be whitelisted in the Firebase Console.
              url: 'https://www.lopezamor.com',
              // This must be true.
              handleCodeInApp: true,
              iOS: {
                bundleId: 'com.example.ios'
              },
              android: {
                packageName: 'com.example.android',
                installApp: true,
                minimumVersion: '12'
              }
            }
          }
        )
        .then(
          user => {
            console.log('Estoy enviando el email de comprobacion de password a: ' + newUser.email)
            firebase.auth().sendSignInLinkToEmail(state.user.email, actionCodeSettings)
             	.then( 
                result => {
                  window.localStorage.setItem('emailForSingIn', newUser.email)
                }
              ) 
          }
        )
        .catch(
          error => {
            console.log('Estoy en el catch de errores de signUserUp')
            commit('shared/setLoading', false, { root: true })
            commit('shared/setActionPass', false, { root: true })
            commit('shared/setError', error, { root: true })
          }
        )
    },
  
    /**
    	* Log In de Usuario
      */
    logUserIn ({commit}, user) {
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
      console.log('Estoy en signUserIn')
      /* Comprueba que el usuario existe en Firebase */
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(
          user => {
            console.log('signUserIn user')
            commit('shared/setLoading', false, { root: true })
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
            commit('navigator/push', HomePage, { root: true })
          }
        )
        .catch(
          error => {
            console.log('logUserIn error')
            commit('shared/setLoading', false, { root: true })
            commit('shared/setError', error, { root: true })
            console.log(error)
          }
        )
    },
  
    /**
     * Autoautenticación, el usuario ya está registrado
     */
    autoSignIn ({commit}, user) {
      commit('setUser', {
        id: user.uid
      })
    },
  
    /**
     * Log Out de Usuario
     */
    signUserOut ({commit}) {
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
      firebase.auth().signOut()
        .then(
          result => {
            commit('shared/setLoading', false, { root: true })
            commit('shared/clearUser', null, { root: true })
          }
        )
        .then(
        	commit('navigator/push', SignUp, { root: true })
        	)
        .catch(
          error => {
            commit('shared/setLoading', false, { root: true })
            commit('shared/setError', error, { root: true })
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
        console.log(activeUser.email + ' está conectado')
      } else {
        console.log('No hay ningún usuario conectado')
      }
    }
  }
}

/*
    signUserUpKK ({commit}, user) {
      console.log('Estoy en signUserUp')
			commit('shared/setLoading', true, { root: true })
     	commit('shared/setActionPass', false, { root: true })
      commit('shared/clearError', null, { root: true })
      /* Crea el usuario en Firebase *//*
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(
          user => {
            commit('shared/setLoading', false, { root: true })
            commit('shared/setActionPass', true, { root: true })
            const newUser = {
              // Añadimos los datos del nuevo usuario
              id: user.uid,
              name: user.displayName,
              email: user.email,
            }
            commit('setUser', newUser) // Llamamos a 'setUser' para añadir nuevas propiedades al user
            console.log('Hay un nuevo usuario: ' + newUser.email)
            //commit('navigator/push', HomePage, { root: true })
          }
        )
        .catch(
          error => {
            console.log('Estoy en el catch de errores de signUserUp')
            commit('shared/setLoading', false, { root: true })
            commit('shared/setActionPass', false, { root: true })
            commit('shared/setError', error, { root: true })
          }
        )
    },
    */
