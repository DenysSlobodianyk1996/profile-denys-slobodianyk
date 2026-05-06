<template>
  <h2 class="font-bold">{{ title }}</h2>

  <!-- <v-img
    rounded="xl"
    :src="photoUrl"
    width="150"
  /> -->
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'

  const baseUrl = import.meta.env.BASE_URL
  const route = useRoute()
  const { t } = useI18n()

  const title = computed(() => {
    const metaTitle = route.meta.title
    return t(metaTitle)
  })
  const photoUrl = computed(() => `${baseUrl}/data/foto.png`)
</script>

<style lang="scss" scoped>
</style>
