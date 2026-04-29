<template>
  <v-app-bar app>
    <v-app-bar-title>
      {{ t('name') }}
    </v-app-bar-title>

    <v-btn
      v-tooltip:left="t('contactWith')"
      color="primary"
      :href="sendEmail"
      icon
    >
      <v-icon>mdi-email</v-icon>
    </v-btn>

    <v-btn
      v-tooltip:left="t('downloadCV')"
      color="text-green-700"
      :href="googleDocCVPdf"
      icon
      target="_blank"
    >
      <v-icon>mdi-cloud-download</v-icon>
    </v-btn>

    <v-menu>
      <template #activator="{ props }">
        <v-btn v-tooltip:left="t('change.language')" icon="mdi-web" variant="text" v-bind="props" />
      </template>

      <v-list>
        <v-list-item
          v-for="item in availableLocales"
          :key="item"
          :prepend-icon="'mdi-web'"
          :title="languageLabels[item]"
          :value="item"
          @click="selectLanguage(item)"
        />
      </v-list>
    </v-menu>

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

  const languageLabels: Record<string, string> = {
    en: 'English',
    ua: 'Українська',
  }

  const docId = `1kpnnvF6vsTxSxWwujlzWYMC73TL_Qg_SAXrTNFmHO20`
  const googleDocCVPdf = `https://docs.google.com/document/d/${docId}/export?format=pdf`
  const contactWithName = computed(() => `${t('contactWith')} ${t('name')}`)
  const sendEmail = computed(() => {
    return `mailto:denys.slobodianyk@gmail.com?subject=${contactWithName.value}`
  })

  function selectLanguage (lang: string): void {
    locale.value = lang
  }
</script>

<style lang="scss" scoped>
  .v-list {
    --v-list-prepend-gap: 8px;
  }
</style>
