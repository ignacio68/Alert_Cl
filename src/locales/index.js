/**
 * Import Dependency
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

/**
 * Import Language
 */
import enUs from './i18n/en_us'
import es from './i18n/es'

/**
 * Import number formats
 */
import { numberFormats } from './i18n/numberFormats'

/**
 * Import date formats
 */
import { dateTimeFormats } from './i18n/dateTimeFormats'

const messages = {
  en: {
    lang: enUs
  },
  es: {
    lang: es
  }
}

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
  /* messages: {
    en: {
      lang: en_US
    },
    es: {
      lang: es
    }
  }, */
  messages,
  dateTimeFormats,
  numberFormats
})
