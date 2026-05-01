<template>
  <v-btn
    v-tooltip:left="t('downloadCV')"
    color="text-green-700"
    :href="googleDocCVPdf"
    icon="mdi-cloud-download"
    target="_blank"
  />
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const docId = `1kpnnvF6vsTxSxWwujlzWYMC73TL_Qg_SAXrTNFmHO20`
  const googleDocCVPdf = `https://docs.google.com/document/d/${docId}/export?format=pdf`
</script>

<style lang="scss" scoped>
</style>
