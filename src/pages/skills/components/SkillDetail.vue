<template>
  <v-sheet class="flex flex-col gap-4 max-w-200">
    <div>
      <p v-html="skillTitle" />

      <template v-if="!!skill.additionalInfo">
        <p>{{ t(skill.additionalInfo) }}</p>
      </template>
    </div>

    <div>
      <v-text-field
        v-model.lazy="search"
        class="mb-2 search-field"
        clearable
        density="compact"
        hide-details
        :label="t('search')"
        max-width="200"
        variant="outlined"
      />

      <v-chip-group column>
        <v-chip
          v-for="(value, index) in filteredSkills"
          :key="index"
        >
          {{ value }}
        </v-chip>
      </v-chip-group>
    </div>

  </v-sheet>
</template>

<script setup lang="ts">
  import type { SkillDetailModel } from '../models'
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const search = ref('')
  const props = defineProps<{
    title: string
    skill: SkillDetailModel
  }>()

  const skillTitle = computed(() => [
    `${props.title}`,
    props.skill.yearsExperience ? `${props.skill.yearsExperience} year(-s)` : null,
    props.skill.version ? `${props.skill.version} version(-s)` : null,
  ].filter(Boolean).join('<br/>'))
  const filteredSkills = computed(() => {
    const currentSearch = search.value?.toLocaleLowerCase() ?? ''
    return props?.skill?.skills?.filter((item: string) => item.toLocaleLowerCase().includes(currentSearch))
  })
</script>

<style lang="scss" scoped>
</style>
