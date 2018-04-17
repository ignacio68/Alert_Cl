/**
 * Import Global Style (.css/.scss)
 * import './onsen-css-components.css'
 * Onsen UI CSS components source for custom themes (requires cssnext)
 */
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

/**
 * Import Dependency
 */
import Vue from 'vue'
import VueOnsen from 'vue-onsenui'
import * as firebase from 'firebase'
import { store } from './store'
import i18n from './locales/index'

// import VueOnsen from 'vue-onsenui/esm'; // Cuando se utiliza ESM
// import * as OnsenComponents from './onsen-components'; // Cuando se utiliza ESM

import AppNavigator from './AppNavigator'

/**
 * Import Component (.vue)
 */
import ThePreloader from './components/Shared/ThePreloader'
import TheCustomtoolbar from './components/Shared/TheCustomToolbar'
// import AlertCmp from './components/Shared/Alert'

/**
 * Import Pages

import TermsOfService from './pages/Shared/TermsOfService'
import PrivacyPolicy from './pages/Shared/PrivacyPolicy'
 */
/**
 * Global Config
 */
Vue.config.productionTip = false
// Vue.use(Vuex)
Vue.use(VueOnsen)

/**
 *  Register pages globally
Vue.component('TermsOfService', TermsOfService)
Vue.component('PrivacyPolicy', PrivacyPolicy)
 */

/**
 * Register components globally
 */
// Object.values(OnsenComponents).forEach(component => Vue.component(component.name, component)); // For ESM
Vue.component('the-preloader', ThePreloader) // Preloader
Vue.component('the-custom-toolbar', TheCustomtoolbar) // Toolbar común
// Vue.component('app-alert', AlertCmp) // Alerta de errores

/**
 * Get device language
 */
let val = navigator.language ||
      navigator.languages[0] ||
      navigator.browserLanguage ||
      navigator.userLanguage ||
      navigator.systemLanguage

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  render: h => h(AppNavigator),

  beforeCreate () {
    // Set app language
    this.$ons.ready(() => {
      if (val) {
        const lang = val.replace('-', '')
        i18n.locale = lang
        console.log('el lenguaje es ' + i18n.locale)
      }
    })

    // Shortcut for Material Design
    Vue.prototype.md = this.$ons.platform.isAndroid()

    // Set iPhoneX flag based on URL
    if (window.location.search.match(/iphonex/i)) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '')
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '')
    }

    // Check if we can use the internationalization API
    if (window.Intl && typeof window.Intl === 'object') {
    // Assume it's supported, lets localize!
      console.log('Se  puede utilizar la internalizacion')
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
    // If user is authenticated then autosign in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('user/autoSignIn', user)
        console.log('El usuario es: ' + user)
      }
    })
  }
})
