import firebase from 'firebase/app'

import 'firebase/database'

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
    /* Carga las alertas en el objeto loadedAlerts del State */
    setLoadedAlerts (state, alerts) {
      state.loadedAlerts = alerts
    },
    /* Añade una alerta nueva al objeto loadedAlerts en el State */
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
      commit('shared/clearError', null, { root: true })
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
          commit('shared/setError', error, { root: true })
          console.log(error)
          commit('shared/setLoading', false, { root: true })
        })
    },

    /**
    * Creamos la alerta
    */
    createAlert ({commit, getters}, payload) {
      console.log('Estoy en createAlert')
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
      // console.log(this.$store.user.state.user)
      const alert = {
        // iD: this.$store.getters['user/user'],
        endDate: payload.endDate || '', // utilizar new Date() en milisegundos
        title: payload.title || '',
        text: payload.text,
        link: payload.link || '',
        phone: payload.alertPhone || ''  // utilizar por defecto el guardado en Firebase
      }
      firebase.database().ref('alerts').push(alert)
        .then((data) => {
          commit('shared/setLoading', false, { root: true })
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
          commit('shared/setLoading', false, { root: true })
          commit('shared/setError', error, { root: true })
          console.log(error)
        })
    }
  }
}
