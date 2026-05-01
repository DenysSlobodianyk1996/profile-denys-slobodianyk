import { createI18n } from 'vue-i18n'
import { LANGUAGE_KEY } from '@/static'

import en from './en'
import ua from './ua'

const messages = {
  en,
  ua,
}

function getStorageLanguage (): string {
  const language = localStorage.getItem(LANGUAGE_KEY) ?? 'en'
  return language
}

export default createI18n({
  legacy: false,
  locale: getStorageLanguage(),
  fallbackLocale: 'en',
  messages,
})
