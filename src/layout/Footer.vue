<template>
  <v-footer app height="60px">
    <p class="mx-auto">&copy;&nbsp;{{ t('name') }}&nbsp;-&nbsp;{{ year }}</p>
  </v-footer>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const year = new Date().getFullYear()
</script>
