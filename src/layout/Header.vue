<template>
  <v-app-bar app>
    <div class="p-2 w-full">
      <h1 class="text-4xl font-heading font-bold text-center">{{ t('name') }}</h1>
    </div>

    <v-btn
      class="m-2"
      icon="mdi-theme-light-dark"
      location="top right"
      position="absolute"
      @click="$vuetify.theme.cycle()"
    />
  </v-app-bar>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
</script>
