<template>
  <v-timeline-item class="work-timeline-item w-full">
    <template #opposite>
      <v-sheet max-width="200">
        {{ props.workTimelineDetail.company }}
      </v-sheet>
    </template>

    <template #default>
      <v-card class="w-full">
        <v-card-title>{{ t('workTimeline.projects') }}</v-card-title>

        <v-card-text>
          {{ props.workTimelineDetail.projects }}
        </v-card-text>
      </v-card>
    </template>
  </v-timeline-item>
</template>

<script setup lang="ts">
  import type { WorkTimelineDetailModel } from '../models'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const props = defineProps<{
    workTimelineDetail: WorkTimelineDetailModel
  }>()
</script>

<style lang="scss" scoped>
  .work-timeline-item {
    :deep(.v-timeline-item__body) {
      width: 100%;
    }
  }
</style>
