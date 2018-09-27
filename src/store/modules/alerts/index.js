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
          const alerts = [] // utilizar un objeto {}
          const obj = data.val()
          for (let key in obj) {
            alerts.push({
              id: key,
              creatorId: obj[key].creatorId,
              userIcon: obj[key].userIcon,
              userName: obj[key].userName,
              endDate: obj[key].endDate,
              alertTitle: obj[key].alertTitle,
              alertText: obj[key].alertText,
              alertLink: obj[key].alertLink,
              alertPhone: obj[key].alertPhone
            })
          }
          commit(this.setLoadedAlerts, alerts)
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
        creatorId: this.$store.getters['user/user.id'],
        userIcon: payload.userIcon, // utilizar el del usuario guardado en firebase.Storage()
        userName: payload.userName, // utilizar el del usuario
        endDate: payload.endDate, // utilizar new Date() en milisegundos
        alertTitle: payload.alertTitle,
        alertText: payload.alertText,
        alertLink: payload.alertLink,
        alertPhone: payload.alertPhone // utilizar por defecto el guardado en Firebase
      }
      firebase.database().ref('alerts').push(alert)
        .then((data) => {
          // key = data.key
          // return key
          commit('createAlert', alert)
          console.log(data)
        })
        /* .then(() => {
          commit('createAlert', {
            ...alert,
            id: key
          })
          console.log(alert)
        }) */
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
