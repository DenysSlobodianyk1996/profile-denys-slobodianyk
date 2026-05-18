<template>
  <h5 class="whitespace-nowrap">{{ detail.title }}</h5>

  <div>
    <template v-if="detail.href">
      <a :href="detail.href" target="_blank">
        {{ detail.desciption || detail.href }}
      </a>
    </template>

    <template v-else>
      <p>{{ detail.desciption }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
  import type { PersonalInfoDetailModel } from '../models'

  defineProps<{ detail: PersonalInfoDetailModel }>()
</script>

<style lang="scss" scoped>
</style>
