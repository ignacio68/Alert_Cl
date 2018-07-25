import * as firebase from 'firebase'

// import 'firebase/database'

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
  	loadedAlerts: []
  },
  getters: {
  	loadedAlerts (state) {
  		return state.loadedAlerts // PENDIENTE: ordenarlas por fechas
  	}
  },
  mutations: {
  	setLoadedAlerts (state, alerts) {
  		state.loadedAlerts = alerts
  	},
  	createAlert (state, alert) {
  		state.loadedAlerts.push(alert)
  	}
  },
  actions: {

  	/**
  	* Recuperamos las alertas de la base de datos
  	* Este punto hay que revisarlo a fondo
  	* cuando se desarrolle el proyecto
  	*/
  	loadAlerts ({commit}) {
  		commit('shared/setLoading', true, { root: true })
  		firebase.database().ref('alerts').once('value')
  			.then((data) => {
  				const alerts = []
  				const obj = data.val()
  				for (let key in obj) {
  					alerts.push({
  						id: key,
  						title: obj[key].title,
  						message: obj[key].message,
  						creatorId: obj[key].creatorId
  					})
  				}
  				commit(setLoadedAlerts, alerts)
  				commit('shared/setLoading', false, { root: true })
  			})
  			.catch((error) => {
  				console.log(error)
  				commit('shared/setLoading', false, { root: true })
  			})
  	},

  	/**
  	* Creamos la alerta
  	*/
  	createAlert ({commit, getters}, payload) {
  		const alert = {
  			title: payload.title,
  			message: payload.message,
  			creatorID: this.$store.getters['user/user.id']
  		}
  		firebase.database().ref('alerts').push(alert)
  			.then((data) => {
  				key = data.key
  				return key
  			})
  			.then(() => {
  				commit('createAlert', {
  					...alert,
  					id: key
  				})
  				console.log(alert)

  			})
  			.catch((error) => {
  				console.log(error)
  			})
  	}
  }
}
