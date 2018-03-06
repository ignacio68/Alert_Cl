import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
// import './onsen-css-components.css'; // Onsen UI CSS components source for custom themes (requires cssnext)

import Vue from 'vue'
// import Vuex from 'vuex'

import VueOnsen from 'vue-onsenui'

import * as firebase from 'firebase'

// import VueOnsen from 'vue-onsenui/esm'; // Cuando se utiliza ESM
// import * as OnsenComponents from './onsen-components'; // Cuando se utiliza ESM

import store from './store'

import AppNavigator from './AppNavigator'

// Componentes importados
// import Customtoolbar from './components/Shared/CustomToolbar'
// import AlertCmp from './components/Shared/Alert'

Vue.config.productionTip = false

// Vue.use(Vuex)
Vue.use(VueOnsen)

// Register components globally
// Object.values(OnsenComponents).forEach(component => Vue.component(component.name, component)); // For ESM

// **-- Componentes --** //
// Vue.component('custom-toolbar', Customtoolbar) // Toolbar común
// Vue.component('app-alert', AlertCmp) // Alerta de errores

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(AppNavigator),

  beforeCreate () {
    // Shortcut for Material Design
    Vue.prototype.md = this.$ons.platform.isAndroid()

    // Set iPhoneX flag based on URL
    if (window.location.search.match(/iphonex/i)) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '')
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '')
    }
  },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyC4OtkddDOolko9H3m9gJLCI9ihq4wvFqs',
      authDomain: 'alert-cliente.firebaseapp.com',
      databaseURL: 'https://alert-cliente.firebaseio.com',
      projectId: 'alert-cliente',
      storageBucket: 'alert-cliente.appspot.com',
      messagingSenderId: '256084022437'
    })
  }
})
