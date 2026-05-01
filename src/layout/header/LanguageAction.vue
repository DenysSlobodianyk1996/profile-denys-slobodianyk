<template>
  <v-btn
    v-tooltip:left="t('change.language')"
    prepend-icon="mdi-web"
    variant="outlined"
    @click="changeLanguage"
  >{{ locale.toLocaleUpperCase() }}</v-btn>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t, availableLocales, locale } = useI18n()

  function changeLanguage (): void {
    const currentLangIndex = availableLocales.indexOf(locale.value)
    const newIndex = currentLangIndex + 1 === availableLocales.length ? 0 : currentLangIndex + 1
    const newLocale = availableLocales[newIndex]
    locale.value = newLocale
  }
</script>

<style lang="scss" scoped>
</style>
