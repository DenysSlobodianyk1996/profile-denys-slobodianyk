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
  import seo from 'virtual:seo'
  import { computed, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import { useTheme } from 'vuetify'

  import Footer from '@/layout/Footer.vue'
  import Header from '@/layout/header'
  import Main from '@/layout/Main.vue'
  import Navigation from '@/layout/navigation'
  import {
    LANGUAGE_KEY,
    SEO_IMAGE_URL,
    SEO_SITE_NAME,
    type SeoRouteId,
    type SeoRouteModel,
    seoRouteUrl,
    THEME_KEY,
  } from '@/static'

  const theme = useTheme()
  const i18n = useI18n()

  const route = useRoute()

  // Unknown or not-yet-resolved routes fall back to the home page copy.
  const seoRoute = computed<SeoRouteModel>(() => {
    const name = route.name as SeoRouteId | undefined
    return (name && seo.routes[name]) || seo.routes['personal-info']
  })
  const canonicalUrl = computed(() => seoRouteUrl(seoRoute.value.path))

  // index.html already carries the home-page versions of these tags (build/seo-plugin.ts).
  // Unhead matches existing <meta>/<link rel="canonical"> elements by their dedupe key
  // (name/property/rel) and updates them in place, so no duplicates are added.
  useHead({
    title: () => seoRoute.value.title,
    link: [
      { rel: 'canonical', href: canonicalUrl },
    ],
    meta: [
      { name: 'description', content: () => seoRoute.value.description },
      { name: 'keywords', content: seo.keywords },

      // Open Graph (Facebook, LinkedIn, etc.)
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: () => seoRoute.value.title },
      { property: 'og:description', content: () => seoRoute.value.description },
      { property: 'og:image', content: SEO_IMAGE_URL },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:site_name', content: SEO_SITE_NAME },

      // Twitter
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: () => seoRoute.value.title },
      { name: 'twitter:description', content: () => seoRoute.value.description },
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
