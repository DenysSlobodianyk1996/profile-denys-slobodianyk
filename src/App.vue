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
  import { useTheme } from 'vuetify'

  import Footer from '@/layout/Footer.vue'
  import Header from '@/layout/Header.vue'
  import Main from '@/layout/Main.vue'
  import Navigation from '@/layout/Navigation.vue'
  import { THEME_KEY } from '@/static'

  const theme = useTheme()

  watch(
    () => theme.global.name.value,
    (updatedTheme: string) => {
      localStorage.setItem(THEME_KEY, updatedTheme)
    },
    {
      immediate: true,
    },
  )
</script>
