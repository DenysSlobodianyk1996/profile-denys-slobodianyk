<template>
  <v-bottom-sheet v-model="isBottomSheetOpened">
    <template #activator="{props: activatorProps}">
      <v-list-item
        v-tooltip:right="t('action.info')"
        label=""
        prepend-icon="mdi-information-outline"
        v-bind="activatorProps"
      />
    </template>

    <v-card class="flex flex-row flex-wrap p-2 gap-2 items-center">
      <p>{{ cardTitle }}</p>

      <v-chip
        v-for="item in usedLibs"
        :key="item"
        color="primary"
        variant="flat"
      >
        {{ item }}
      </v-chip>
    </v-card>
  </v-bottom-sheet>

</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { dataService } from '@/services'
  import { useDataStore } from '@/stores'

  const { t } = useI18n()
  const dataStore = useDataStore()

  const { usedLibs } = storeToRefs(dataStore)
  const isBottomSheetOpened = ref(false)
  const cardTitle = computed(() => `${t('createdWith')}:`)

  async function loadUsedLibs () {
    if (usedLibs.value.length > 0) {
      // Don't load again if we already have the data
      return
    }
    const usedLibsResponse = await dataService.getUsedLibs()
    dataStore.setUsedLibs(usedLibsResponse)
  }

  watch(
    () => isBottomSheetOpened.value,
    (newIsBottomSheetOpened: boolean) => {
      newIsBottomSheetOpened && loadUsedLibs()
    },
  )
</script>

<style lang="scss" scoped>

</style>
