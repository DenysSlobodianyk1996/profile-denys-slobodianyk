// Types
import type { App } from 'vue'
import head from './head'
import i18n from './i18n'
import pinia from './pinia'
import router from './router'
/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */
// Plugins
import vuetify from './vuetify'

export function registerPlugins (app: App) {
  app.use(head)
  app.use(i18n)
  app.use(pinia)
  app.use(router)
  app.use(vuetify)
}
