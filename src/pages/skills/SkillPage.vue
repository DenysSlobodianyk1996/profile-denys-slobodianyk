<template>
  <v-sheet class="flex flex-col gap-4">
    <v-tabs
      v-model="selectedTab"
      class="tabs-container"
      color="primary"
      inset
    >
      <template v-for="item in skillTitles" :key="item.key">
        <v-tab :value="item.key">
          {{ item.title }}
        </v-tab>
      </template>
    </v-tabs>

    <v-tabs-window v-model="selectedTab" class="w-full">
      <template v-for="(item, index) in skillTitles" :key="index">
        <v-tabs-window-item :value="item.key">
          <SkillDetail :skill="skills[item.key]" :title="item.title" />
        </v-tabs-window-item>
      </template>
    </v-tabs-window>
  </v-sheet>

</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, onMounted, ref, watch } from 'vue'
  import { dataService } from '@/services'
  import { useDataStore } from '@/stores'
  import SkillDetail from './components'

  const dataStore = useDataStore()

  const selectedTab = ref<string>('')

  // Skills logic
  const { skills } = storeToRefs(dataStore)
  const skillTitles = computed(() => Object.keys(skills.value).map(item => {
    return {
      key: item,
      title: item.split('_').map(text => `${text.charAt(0).toUpperCase()}${text.slice(1)}`).join(' '),
    }
  }))

  // setup fist tab selected based on skills list
  watch(
    skillTitles,
    newSkillTitles => {
      const angularTabIndex = newSkillTitles.findIndex(({ key }) => key === 'angular')
      const defaultTabIndex = angularTabIndex === -1 ? 0 : angularTabIndex
      selectedTab.value = newSkillTitles.at(defaultTabIndex)?.key || ''
    },
  )

  async function loadSkills () {
    if (Object.keys(skills.value).length > 0) {
      // Data already loaded, no need to fetch again
      return
    }
    const loadedSkills = await dataService.getSkills()
    dataStore.setSkills(loadedSkills)
  }

  onMounted(() => {
    loadSkills()
  })
</script>

<style lang="scss" scoped>
  .tabs-container {
    height: auto;
    :deep(.v-slide-group__content) {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
  }
</style>
