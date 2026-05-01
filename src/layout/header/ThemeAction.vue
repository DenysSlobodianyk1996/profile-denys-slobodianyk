<template>
  <v-btn
    v-tooltip:left="t('change.theme')"
    icon="mdi-theme-light-dark"
    @click="theme.cycle()"
  />
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { useTheme } from 'vuetify'

  const { t } = useI18n()
  const theme = useTheme()
</script>

<style lang="scss" scoped>

</style>
