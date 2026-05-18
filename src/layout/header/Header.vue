<template>
  <v-app-bar app class="pe-2">
    <v-app-bar-title :text="appBarTitle" />
    <ContactAction />
    <DownloadCVAction />
    <LanguageAction />
  </v-app-bar>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import ContactAction from './ContactAction.vue'
  import DownloadCVAction from './DownloadCVAction.vue'
  import LanguageAction from './LanguageAction.vue'

  const { t } = useI18n()
  const route = useRoute()

  const routeMetaTitle = computed(() => {
    const metaTitle = route.meta.title as string
    return metaTitle ? t(metaTitle) : null
  })

  const appBarTitle = computed(() => routeMetaTitle.value ?? '')
</script>

<style lang="scss" scoped>
</style>
