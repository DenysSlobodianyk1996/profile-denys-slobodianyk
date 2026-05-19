<template>
  <v-app>
    <Header />
    <Navigation />
    <Main />
    <Footer />
  </v-app>
</template>

<script lang="ts" setup>
  import { useHead } from '@vueuse/head'
  import { computed, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useTheme } from 'vuetify'

  import Footer from '@/layout/Footer.vue'
  import Header from '@/layout/header'
  import Main from '@/layout/Main.vue'
  import Navigation from '@/layout/navigation'
  import { LANGUAGE_KEY, THEME_KEY } from '@/static'

  const theme = useTheme()
  const i18n = useI18n()
  const baseUrl = import.meta.env.BASE_URL

  const title = ref('Denys Slobodianyk Profile')
  const description = ref('Denys Slobodianyk - Frontend developer. Angular - Senior, React.js - Middle, Vue.js - Junior. Preferable - Angular and Vue positions, but React is an option too')
  const keywords = ref('Angular, Vue.js, React.js, JavaScript, TypeScript, SCSS, Bootstrap, Tailwind, Scrum, Mentoring, Code reviewing, Responsibility')
  const photoUrl = computed(() => `${window.location.origin}${baseUrl}/data/foto.png`)

  useHead({
    title: computed(() => title.value),
    meta: [
      {
        name: 'description',
        content: computed(() => description.value),
      },
      {
        name: 'keywords',
        content: computed(() => keywords.value),
      },

      // Open Graph (Facebook, LinkedIn, etc.)
      {
        name: 'og:type',
        content: 'website',
      },
      {
        name: 'og:title',
        content: computed(() => title.value),
      },
      {
        name: 'og:description',
        content: computed(() => description.value),
      },
      {
        name: 'og:image',
        content: computed(() => photoUrl.value),
      },
      {
        name: 'og:url',
        content: baseUrl,
      },
      {
        name: 'og:site_name',
        content: computed(() => title.value),
      },

      // Twitter
      {
        name: 'twitter:title',
        content: computed(() => title.value),
      },
      {
        name: 'twitter:description',
        content: computed(() => description.value),
      },
      {
        name: 'twitter:image',
        content: computed(() => photoUrl.value),
      },
    ],
  })

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
