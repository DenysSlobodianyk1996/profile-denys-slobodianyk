<template>
  <h2>{{ title }}</h2>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const { t } = useI18n()

  const title = computed(() => {
    const metaTitle = route.meta.title
    return t(metaTitle)
  })
</script>

<style lang="scss" scoped>
</style>
