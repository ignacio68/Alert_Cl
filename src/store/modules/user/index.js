import * as firebase from 'firebase'

// import 'firebase/auth'

import HomePage from '../../../pages/HomePage'
import SignUp from '../../../pages/User/SignUp'
// const fb = require('../../../components/Firebase/firebaseConfig')

export default {
	strict: true,
	namespaced: true,
	state: {
		user: null, // el usuario inicial siempre está vacio
		 /* Creamos el objeto ActionCodeSettings que proporciona instrucciones a Firebase*/
		actionCodeSettings: {
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
	},
	getters: {
		user (state) {
			return state.user // devuelve el usuario desde state
		}
	},
	mutations: {
		setUser (state, payload) {
			state.user = payload // Añade a user las propiedades del usuario registrado
			console.log('El id del usuario es: ' + state.user.id)
		},
		clearUser (state) {
			state.user = null // resetea el user
		}
	},
	actions: {
		/**
		* Nuevo Usuario
		*/
		signUserUp ({commit, dispatch, state}, payload) {
			console.log('Estoy en signUserUp')
			commit('shared/setLoading', true, { root: true })
			commit('shared/setActionPass', false, { root: true })
			commit('shared/clearError', null, { root: true })
	
			/* Crea el usuario en Firebase */
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
				.then(
					firebaseUser => {
						console.log('Estoy dentro de createUserWithEmailAndPassword')
						commit('shared/setLoading', false, { root: true })
						commit('shared/setActionPass', true, { root: true })
						const newUser = {
							// Añadimos los datos del nuevo usuario
							id: firebaseUser.uid,
							// name: user.name,
							email: firebaseUser.email,
						}
						commit('setUser', newUser) // Llamamos a 'setUser' para añadir nuevas propiedades al user
						console.log('Hay un nuevo usuario: ' + payload.email)
						// let enviarEmail = function() {
						// 	(dispatch('confirmPassword', payload.email))
						// }
						//
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
		* Envía un email de confirmación de password
		*/
		confirmPassword ({commit, state}, firebaseUserEmail) {
			commit('shared/setLoading', true, { root: true })
			commit('shared/clearError', null, { root: true })
			console.log('Estoy enviando el email de comprobacion de password a: ' + firebaseUserEmail)
			firebase.auth().sendSignInLinkToEmail(firebaseUserEmail, state.actionCodeSettings)
				.then(
					() => {
						console.log('Guardo el email: ' + firebaseUserEmail + ('en emailForSignIn') )
						commit('shared/setLoading', false, { root: true })
						window.localStorage.setItem('emailForSingIn', firebaseUserEmail)
					}
				)
				.catch(
					error => {
						console.log('confirmPassword error')
						commit('shared/setLoading', false, { root: true })
						commit('shared/setError', error, { root: true })
						console.log(error)
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
