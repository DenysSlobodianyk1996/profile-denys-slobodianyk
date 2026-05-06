<template>
  <v-bottom-sheet>
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

<script setup>
  import { storeToRefs } from 'pinia'
  import { computed, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { dataService } from '@/services'
  import { useDataStore } from '@/stores'

  const { t } = useI18n()

  const dataStore = useDataStore()

  const { usedLibs } = storeToRefs(dataStore)
  const cardTitle = computed(() => `${t('createdWith')}:`)

  async function loadUsedLibs () {
    const usedLibs = await dataService.getUsedLibs()
    dataStore.setUsedLibs(usedLibs)
  }

  onMounted(() => {
    loadUsedLibs()
  })
</script>

<style lang="scss" scoped>

</style>
