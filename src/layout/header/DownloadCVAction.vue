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
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const baseUrl = import.meta.env.BASE_URL
  const cvPath = computed(() => `${baseUrl}/data/CV_Denys_S_Angular_React_Vue.pdf`)
</script>

<style lang="scss" scoped>
</style>
