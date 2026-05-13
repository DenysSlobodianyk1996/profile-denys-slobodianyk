<template>
  <v-text-field
    v-model.lazy="search"
    class="mb-2"
    clearable
    :label="t('search')"
    :max-width="contentMaxWidth"
  />

  <v-chip-group :class="tailwindMaxWidth" column>
    <v-chip
      v-for="(value, index) in filteredSkills"
      :key="index"
    >
      {{ value }}
    </v-chip>
  </v-chip-group>

</template>

<script setup lang="ts">
  import type { Skill } from '../models'
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const search = ref('')
  const contentMaxWidth = ref(200)
  const props = defineProps<{
    skill: Skill
  }>()

  const tailwindMaxWidth = computed(() => 'max-w-' + contentMaxWidth.value)
  const filteredSkills = computed(() => {
    const currentSearch = search.value?.toLocaleLowerCase() ?? ''
    return props?.skill?.skills?.filter((item: string) => item.toLocaleLowerCase().includes(currentSearch))
  })
</script>

<style lang="scss" scoped>

</style>
