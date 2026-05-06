<template>
  <v-app-bar app>
    <v-app-bar-title :text="t('name')" />
    <ContactAction />
    <DownloadCVAction />
    <LanguageAction />
  </v-app-bar>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import ContactAction from './ContactAction.vue'
  import DownloadCVAction from './DownloadCVAction.vue'
  import LanguageAction from './LanguageAction.vue'

  const { t } = useI18n()
</script>

<style lang="scss" scoped>
</style>
