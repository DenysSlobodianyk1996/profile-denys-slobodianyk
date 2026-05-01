<template>
  <v-navigation-drawer permanent rail>
    <v-list>
      <template v-for="item in navigagtionItems" :key="item.label">
        <v-list-item
          v-tooltip:right="t(item.label)"
          label=""
          link
          :prepend-icon="item.icon"
          :to="item.url"
        />
      </template>

      <v-divider />

      <InfoAction />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import InfoAction from './InfoAction.vue'

  const { t } = useI18n()

  const navigagtionItems: { label: string, url: string, icon: string } [] = [
    {
      label: 'personalInfo',
      url: '/',
      icon: 'mdi-account-tie',
    },
    {
      label: 'skills',
      url: '/skills',
      icon: 'mdi-network-pos',
    },
    {
      label: 'workExperience',
      url: '/work-experience',
      icon: 'mdi-account-group',
    },
  ]
</script>

<style lang="scss" scoped>

</style>
