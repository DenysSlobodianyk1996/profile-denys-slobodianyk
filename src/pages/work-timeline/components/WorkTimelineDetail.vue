<template>
  <v-timeline-item class="work-timeline-item">
    <template #opposite>
      <CompanyDetail :company="company" />
    </template>

    <template #default>
      <template v-if="smAndDown">
        <v-card elevation="0">
          <v-card-text>
            <CompanyDetail :company="company" />
          </v-card-text>
        </v-card>
      </template>

      <ProjectsDetail :projects="projects" />
    </template>
  </v-timeline-item>
</template>

<script setup lang="ts">
  import type { WorkTimelineDetailModel } from '../models'
  import { computed } from 'vue'
  import { useDisplay } from 'vuetify'
  import CompanyDetail from './CompanyDetail.vue'
  import ProjectsDetail from './ProjectsDetail.vue'

  const { smAndDown } = useDisplay()

  const props = defineProps<{
    workTimelineDetail: WorkTimelineDetailModel
  }>()

  const company = computed(() => props.workTimelineDetail.company)
  const projects = computed(() => props.workTimelineDetail.projects)
</script>

<style lang="scss" scoped>
  .work-timeline-item {
    :deep(.v-timeline-item__body), :deep(.v-timeline-item__opposite) {
      width: 100%;
      align-self: flex-start;
    }
    :deep(.v-timeline-divider) {
      justify-content: flex-start;
    }
  }
</style>
