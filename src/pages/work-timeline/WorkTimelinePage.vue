<template>
  <h2>{{ title }}</h2>

  <v-timeline class="work-timeline justify-start" direction="vertical" side="end">
    <template v-for="workTimelineDetail in workTimelineDetails" :key="workTimelineDetail.company.name">
      <WorkTimelineDetail :work-timeline-detail="workTimelineDetail" />
    </template>
  </v-timeline>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import { dataService } from '@/services'
  import { useDataStore } from '@/stores'
  import WorkTimelineDetail from './components'

  const route = useRoute()
  const { t } = useI18n()
  const dataStore = useDataStore()

  const title = computed(() => {
    const metaTitle = route.meta.title as string
    return t(metaTitle)
  })

  // WorkTimelineDetails logic
  const { workTimelineDetails } = storeToRefs(dataStore)
  async function loadWorkTimeline () {
    if (Object.keys(workTimelineDetails.value ?? {}).length > 0) {
      // Data already loaded, no need to fetch again
      return
    }
    const loadedWorkTimelineDetails = await dataService.getWorkTimelineDetails()
    dataStore.setWorkTimelineDetails(loadedWorkTimelineDetails)
  }

  onMounted(() => {
    loadWorkTimeline()
  })
</script>

<style lang="scss" scoped>
  // .work-timeline {
  //   :deep(.v-timeline-item__body) {
  //     width: 100%;
  //   }
  // }
</style>
