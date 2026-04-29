// Types
import type { App } from 'vue'
import i18n from './i18n'
import router from './router'
/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */
// Plugins
import vuetify from './vuetify'

export function registerPlugins (app: App) {
  app.use(i18n)
  app.use(router)
  app.use(vuetify)
}
