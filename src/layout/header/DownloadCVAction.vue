<template>
  <v-btn
    v-tooltip:left="t('action.downloadCV')"
    color="text-green-700"
    download
    :href="cvPath"
    icon="mdi-cloud-download"
    target="_blank"
  />
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const cvPath = '/CV_Denys_S_Angular_React_Vue.pdf'
</script>

<style lang="scss" scoped>
</style>
