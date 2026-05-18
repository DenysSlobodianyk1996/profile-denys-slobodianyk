<template>
  <v-timeline class="work-timeline" :density="timelineDensity" direction="vertical" side="end">
    <template v-for="workTimelineDetail in workTimelineDetails" :key="workTimelineDetail.company.name">
      <WorkTimelineDetail :work-timeline-detail="workTimelineDetail" />
    </template>
  </v-timeline>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, onMounted } from 'vue'
  import { useDisplay } from 'vuetify'
  import { dataService } from '@/services'
  import { useDataStore } from '@/stores'
  import WorkTimelineDetail from './components'

  const dataStore = useDataStore()
  const { smAndDown } = useDisplay()

  const timelineDensity = computed(() => smAndDown.value ? 'compact' : 'comfortable')

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
  .work-timeline {
    grid-template-columns: auto min-content 1fr;
  }
</style>
