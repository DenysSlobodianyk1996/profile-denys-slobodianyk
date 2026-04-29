import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    name: 'Denys Slobodianyk',
  },
  ua: {
    name: 'Денис Слободяник',
  },
}

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})
