<template>
  <v-app>
    <Header />
    <Navigation />
    <Main />
    <Footer />
  </v-app>
</template>

<script lang="ts" setup>
  import { watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useTheme } from 'vuetify'

  import Footer from '@/layout/Footer.vue'
  import Header from '@/layout/header'
  import Main from '@/layout/Main.vue'
  import Navigation from '@/layout/navigation'
  import { LANGUAGE_KEY, THEME_KEY } from '@/static'

  const theme = useTheme()
  const i18n = useI18n()

  watch(
    () => theme.global.name.value,
    (updatedTheme: string) => {
      localStorage.setItem(THEME_KEY, updatedTheme)
    },
    {
      immediate: true,
    },
  )

  watch(
    () => i18n.locale.value,
    (updatedLocale: string) => {
      localStorage.setItem(LANGUAGE_KEY, updatedLocale)
    },
    {
      immediate: true,
    },
  )
</script>
