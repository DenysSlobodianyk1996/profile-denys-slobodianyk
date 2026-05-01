<template>
  <v-btn
    v-tooltip:left="contactWithName"
    color="text-blue-700"
    :href="sendEmail"
    icon="mdi-email"
  />
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const contactWithName = computed(() => `${t('contactWith')} ${t('name')}`)
  const sendEmail = computed(() => {
    return `mailto:denys.slobodianyk@gmail.com?subject=${contactWithName.value}`
  })
</script>

<style lang="scss" scoped>

</style>
