<template>
  <v-app-bar app>
    <v-app-bar-title>
      {{ t('name') }}
    </v-app-bar-title>

    <v-btn
      v-tooltip:left="contactWithName"
      color="primary"
      :href="sendEmail"
      icon="mdi-email"
    />

    <v-btn
      v-tooltip:left="t('downloadCV')"
      color="text-green-700"
      :href="googleDocCVPdf"
      icon="mdi-cloud-download"
      target="_blank"
    />

    <v-btn
      v-tooltip:left="t('change.language')"
      prepend-icon="mdi-web"
      variant="outlined"
      @click="toggleLanguage"
    >{{ locale.toLocaleUpperCase() }}</v-btn>

    <v-btn
      v-tooltip:left="t('change.theme')"
      icon
      @click="theme.cycle()"
    >
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useTheme } from 'vuetify'

  const { t, availableLocales, locale } = useI18n()
  const theme = useTheme()

  const docId = `1kpnnvF6vsTxSxWwujlzWYMC73TL_Qg_SAXrTNFmHO20`
  const googleDocCVPdf = `https://docs.google.com/document/d/${docId}/export?format=pdf`
  const contactWithName = computed(() => `${t('contactWith')} ${t('name')}`)
  const sendEmail = computed(() => {
    return `mailto:denys.slobodianyk@gmail.com?subject=${contactWithName.value}`
  })

  function toggleLanguage (): void {
    const currentLangIndex = availableLocales.indexOf(locale.value)
    const newIndex = currentLangIndex + 1 === availableLocales.length ? 0 : currentLangIndex + 1
    const newLocale = availableLocales[newIndex]
    locale.value = newLocale
  }
</script>

<style lang="scss" scoped>
  .v-list {
    --v-list-prepend-gap: 8px;
  }
</style>
