/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */
import { createVuetify } from 'vuetify'
import { THEME_KEY } from '@/static'

import '@mdi/font/css/materialdesignicons.css'
import '../styles/layers.css'
import 'vuetify/styles'

function getStorageTheme (): string {
  const theme = localStorage.getItem(THEME_KEY) ?? 'system'
  return theme
}

export default createVuetify({
  theme: {
    defaultTheme: getStorageTheme(),
    utilities: false,
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1145,
      xl: 1545,
      xxl: 2138,
    },
  },
})
