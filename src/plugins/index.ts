// Types
import type { App } from 'vue'
import i18n from './i18n'
/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */
// Plugins
import vuetify from './vuetify'

export function registerPlugins (app: App) {
  app.use(vuetify)
  app.use(i18n)
}
