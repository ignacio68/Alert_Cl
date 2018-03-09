/**
 * Import Dependency
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

/**
 * Import Language
 */
import en from './i18n/en_US'
import es from './i18n/es'

/**
 * Import Language
 */
import { dateTimeFormats } from './i18n/dateTimeFormats'

/**
 * Import Currency
 */
import { numberFormats } from './i18n/numberFormats'

/**
 * Config
 */
Vue.use(VueI18n)

/**
 * Export
 */
export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      lang: en
    },
    es: {
      lang: es
    }
  },
  dateTimeFormats,
  numberFormats
})
