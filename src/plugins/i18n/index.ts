import { createI18n } from 'vue-i18n'
import en from './en'
import ua from './ua'

const messages = {
  en,
  ua,
}

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})
