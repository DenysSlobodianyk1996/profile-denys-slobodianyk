<template>
  <h2>{{ title }}</h2>

  <v-sheet class="flex gap-4">
    <v-tabs
      v-model="selectedTab"
      class="mb-2"
      color="primary"
      direction="vertical"
      inset
    >
      <template v-for="item in skillTitles" :key="item.key">
        <v-tab :value="item.key">
          {{ item.title }}
        </v-tab>
      </template>
    </v-tabs>

    <v-tabs-window v-model="selectedTab" class="w-full">
      <template v-for="item in skillTitles" :key="item.key">
        <v-tabs-window-item :value="item.key">
          <p>content</p>
          <p>{{ skills[item.key] }}</p>
        </v-tabs-window-item>
      </template>
    </v-tabs-window>
  </v-sheet>

</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, onMounted, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'

  import { dataService } from '@/services'
  import { useDataStore } from '@/stores'

  const route = useRoute()
  const { t } = useI18n()
  const dataStore = useDataStore()
  const { skills } = storeToRefs(dataStore)

  const selectedTab = ref<string>('')
  const title = computed(() => {
    const metaTitle = route.meta.title as string
    return t(metaTitle)
  })
  // Skills
  const skillTitles = computed(() => Object.keys(skills.value).map(item => {
    return {
      key: item,
      title: item.split('_').map(text => `${text.charAt(0).toUpperCase()}${text.slice(1)}`).join(' '),
    }
  }))

  watch(
    skillTitles,
    newSkillTitles => {
      selectedTab.value = newSkillTitles.at(0)?.key || ''
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

</style>
