<template>
  <v-sheet max-width="250">
    <h4>{{ company.name }}</h4>
    <hr>
    <p class="whitespace-pre-line">{{ company.position }}</p>
    <small><em>{{ company.timeline }}</em></small>
  </v-sheet>
</template>

<script setup lang="ts">
  import type { CompanyModel } from '../models'
  import { computed } from 'vue'

  const props = defineProps<{
    company: CompanyModel
  }>()

  const company = computed(() => props.company)
</script>

<style lang="scss" scoped>

</style>
