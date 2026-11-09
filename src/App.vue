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
  import { watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useTheme } from 'vuetify'

  import Footer from '@/layout/Footer.vue'
  import Header from '@/layout/header'
  import Main from '@/layout/Main.vue'
  import Navigation from '@/layout/navigation'
  import {
    LANGUAGE_KEY,
    SEO_CANONICAL_URL,
    SEO_DESCRIPTION,
    SEO_IMAGE_URL,
    SEO_KEYWORDS,
    SEO_SITE_NAME,
    SEO_TITLE,
    THEME_KEY,
  } from '@/static'

  const theme = useTheme()
  const i18n = useI18n()

  // The same tags are baked into index.html at build time (build/seo-plugin.ts).
  useHead({
    title: SEO_TITLE,
    meta: [
      { name: 'description', content: SEO_DESCRIPTION },
      { name: 'keywords', content: SEO_KEYWORDS },

      // Open Graph (Facebook, LinkedIn, etc.)
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: SEO_TITLE },
      { property: 'og:description', content: SEO_DESCRIPTION },
      { property: 'og:image', content: SEO_IMAGE_URL },
      { property: 'og:url', content: SEO_CANONICAL_URL },
      { property: 'og:site_name', content: SEO_SITE_NAME },

      // Twitter
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: SEO_TITLE },
      { name: 'twitter:description', content: SEO_DESCRIPTION },
      { name: 'twitter:image', content: SEO_IMAGE_URL },
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
