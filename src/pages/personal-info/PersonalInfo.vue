<template>
  <h2>{{ title }}</h2>

  <v-sheet class="flex md:flex-row flex-col gap-4">
    <v-img
      class="self-start mt-4"
      rounded="xl"
      :src="photoUrl"
      width="150"
    />

    <v-container fluid>
      <div class="grid sm:grid-cols-[max-content_1fr] grid-cols-1fr gap-x-4 sm:gap-y-3 xs:[&>div:nth-child(2n):not(:last-child)]:mb-3">
        <h3>{{ t('personalInfo.positions') }}</h3>

        <div>
          <template v-for="detail in positionDetails" :key="detail.title">
            <div class="flex flex-row items-center gap-2">
              <PersonalInfoDetail :detail="detail" />
            </div>
          </template>
        </div>

        <template v-for="detail in additionalDetails" :key="detail.title">
          <PersonalInfoDetail :detail="detail" />
        </template>
      </div>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import { dataService } from '@/services'
  import { useDataStore } from '@/stores'
  import PersonalInfoDetail from './PersonalInfoDetail.vue'

  const baseUrl = import.meta.env.BASE_URL
  const route = useRoute()
  const { t } = useI18n()

  const dataStore = useDataStore()
  const { personalInfo } = storeToRefs(dataStore)

  const title = computed(() => {
    const metaTitle = route.meta.title as string
    return t(metaTitle)
  })
  const photoUrl = computed(() => `${baseUrl}/data/foto.png`)

  const positionDetails = computed(() => personalInfo.value.positionDetails)
  const additionalDetails = computed(() => personalInfo.value.additionalDetails?.map(item => {
    if (item.title === 'Email') {
      return {
        ...item,
        href: item.href!.replace('{subject}', encodeURIComponent(t('action.contactWithMe'))),
      }
    }
    return item
  }))

  async function loadPersonalInfo () {
    if (positionDetails.value.length > 0 && additionalDetails.value?.length > 0) {
      // Data already loaded, no need to fetch again
      return
    }
    const personalInfo = await dataService.getPersonalInfo()
    dataStore.setPersonalInfo(personalInfo)
  }

  onMounted(() => {
    loadPersonalInfo()
  })
</script>

<style lang="scss" scoped>
</style>
