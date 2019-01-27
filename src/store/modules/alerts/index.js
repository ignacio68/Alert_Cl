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
      console.log('Estoy en getters:loadedAlerts')
      console.log(state.loadedAlerts)
      return state.loadedAlerts // PENDIENTE: ordenarlas por fechas
      /*
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      }) */
    }
  },
  mutations: {
    /* Carga las alertas en el objeto loadedAlerts del State */
    setLoadedAlerts (state, alerts) {
      console.log('Estoy en setLoadedAlerts')
      state.loadedAlerts = alerts
      console.log(state.loadedAlerts)
    },
    /* Añade una alerta nueva al objeto loadedAlerts en el State */
    createAlert (state, alert) {
      state.loadedAlerts.push(alert)
    },
    addStartDate (state, date) {
      console.log('Añadimos la fecha de inicio a la alerta')
    }
  },
  actions: {
    /**
    * Creamos la alerta
    */
    createAlert ({commit, state}, alertData) {
      console.log('Estoy en createAlert')
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
      // console.log(this.$store.user.state.user)
      const alert = {
        // creatorId: this.$store.getters['user/user'],
        startDate: alertData.startDate || '', // utilizar new Date() en milisegundos
        endDate: alertData.endDate || '', // utilizar new Date() en milisegundos
        title: alertData.title || '',
        text: alertData.text,
        link: alertData.link || '',
        phone: alertData.alertPhone || ''  // utilizar por defecto el guardado en Firebase
      }
      let key
      // Genera una nueva alerta en la base de datos
      firebase.database().ref('alerts').push(alert)
        .then((data) => {
          commit('shared/setLoading', false, { root: true })
          key = data.key
          return key
        })
        .then(() => {
          commit('createAlert', {
            ...alert,
            id: key
          })
          console.log(alert)
          console.log(key)
        })
        .catch((error) => {
          commit('shared/setLoading', false, { root: true })
          commit('shared/setError', error, { root: true })
          console.log(error)
        })
    },
     /**
    * Recuperamos las alertas de la base de datos
    * Este punto hay que revisarlo a fondo
    * cuando se desarrolle el proyecto
    */
    loadAlerts ({commit}) {
      commit('shared/setLoading', true, { root: true })
      commit('shared/clearError', null, { root: true })
      console.log('Estoy en action:loadAlerts')
      firebase.database().ref('alerts').once('value')
        .then((data) => {
          console.log('Ahora estoy dentro de la base de datos /alert')
          const alerts = [] // utilizar un objeto {}
          const obj = data.val()
          console.log(obj)
          for (let key in obj) {
            alerts.push({
              id: key,
              creatorId: obj[key].creatorId,
              userIcon: obj[key].userIcon,
              userName: obj[key].userName,
              endDate: obj[key].endDate,
              alertTitle: obj[key].title,
              alertText: obj[key].text,
              alertLink: obj[key].link,
              alertPhone: obj[key].phone
            })
          }
          commit('setLoadedAlerts', alerts) // comprobar que funciona "this"
          commit('shared/setLoading', false, { root: true })
        })
        .catch((error) => {
          commit('shared/setLoading', false, { root: true })
          commit('shared/setError', error, { root: true })
          console.log(error)
        })
    }
  }
}
