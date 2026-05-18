<template>
  <v-card>
    <v-card-title>{{ t('workTimeline.projects') }}</v-card-title>

    <v-card-text class="flex flex-col gap-2">
      <template v-for="project in projects" :key="project.name">
        <v-sheet>
          <h4>{{ project.name }} - {{ project.timeline }}</h4>
          <p>{{ project.description }}</p>

          <v-chip-group column>
            <v-chip
              v-for="(value, index) in project.skills"
              :key="index"
            >
              {{ value }}
            </v-chip>
          </v-chip-group>
        </v-sheet>
      </template>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import type { ProjectModel } from '../models'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const props = defineProps<{
    projects: ProjectModel[]
  }>()

  const projects = computed(() => props.projects)
</script>

<style lang="scss" scoped>

</style>
