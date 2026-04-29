<template>
  <v-footer app height="60px">
    <p class="mx-auto">&copy;{{ year }}&nbsp;-&nbsp;{{ t('createdWithVue') }}</p>
  </v-footer>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  const year = new Date().getFullYear()
</script>
