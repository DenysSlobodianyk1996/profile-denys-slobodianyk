<template>
  <v-bottom-sheet>
    <template #activator="{props: activatorProps}">
      <v-list-item
        label=""
        prepend-icon="mdi-information-outline"
        v-bind="activatorProps"
      />
    </template>

    <v-card class="flex flex-row gap-2 items-center" :title="cardTitle">
      <v-chip
        v-for="item in libsList"
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
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const cardTitle = computed(() => `${t('createdWith')}:`)
  const libsList = ['vue', 'vuetify', 'vue-i18n', 'vue-router']
</script>

<style lang="scss" scoped>

</style>
