<template>
  <v-navigation-drawer app permanent rail>
    <v-list>
      <template v-for="item in navigagtionItems" :key="item.title">
        <v-list-item
          v-tooltip:right="t(item.title)"
          label=""
          link
          :prepend-icon="item.icon"
          :to="item.path"
        />
      </template>

      <v-divider class="my-1" />

      <InfoAction />
      <ThemeAction />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { NAVIGATION_ITEMS } from '@/static'
  import InfoAction from './InfoAction.vue'
  import ThemeAction from './ThemeAction.vue'

  const { t } = useI18n()

  const navigagtionItems = NAVIGATION_ITEMS
</script>

<style lang="scss" scoped>

</style>
