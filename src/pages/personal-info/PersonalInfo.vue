<template>
  <h2>{{ title }}</h2>

  <v-sheet class="flex flex-row gap-4">
    <v-img
      class="self-start mt-4"
      rounded="xl"
      :src="photoUrl"
      width="150"
    />

    <v-container fluid>
      <div class="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-3">
        <h3>Positions</h3>

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
  import type { PersonalInfoDetails } from './models'
  import { computed, type ComputedRef } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import PersonalInfoDetail from './PersonalInfoDetail.vue'

  const baseUrl = import.meta.env.BASE_URL
  const route = useRoute()
  const { t } = useI18n()

  const title = computed(() => {
    const metaTitle = route.meta.title as string
    return t(metaTitle)
  })
  const photoUrl = computed(() => `${baseUrl}/data/foto.png`)

  const positionDetails: PersonalInfoDetails[] = [
    {
      title: 'Angular 5-21',
      desciption: 'Senior - 3500 (+- 500) USD',
    },
    {
      title: 'React',
      desciption: 'Middle - 2000 (+-500) USD',
    },
    {
      title: 'Vue',
      desciption: 'Junior / Pre Middle - 1500 (+-500) USD',
    },
  ]

  const additionalDetails: ComputedRef<PersonalInfoDetails[]> = computed(() => ([
    {
      title: 'Remote',
      desciption: 'Based in Bila Tserkva, Kyiv region, Ukraine',
    },
    {
      title: 'English',
      desciption: 'B2 Upper Intermediate',
    },
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/in/denys-slobodianyk-928202162/',
    },
    {
      title: 'Phone',
      desciption: '(099) 260 56 00',
      href: 'https://t.me/denysslobodianyk',
    },
    {
      title: 'Email',
      desciption: 'denys.slobodianyk@gmail.com',
      href: `mailto:denys.slobodianyk@gmail.com?subject=${encodeURIComponent(t('action.contactWithMe'))}`,
    },
    {
      title: 'Education',
      desciption: 'Master degree with honors. Vinnytsia National Technical University',
    },
    {
      title: 'Private entrepreneur',
      desciption: 'Monobank UAH / USD',
    },
  ]))
</script>

<style lang="scss" scoped>
</style>
