<template>
  <v-sheet aria-labelledby="testimonials-title" class="px-4 pb-4 flex flex-col gap-3" tag="section">
    <div class="flex flex-row flex-wrap items-baseline justify-between gap-2">
      <h2 id="testimonials-title" class="text-xl md:text-2xl font-bold">{{ t('testimonials.title') }}</h2>

      <a :href="testimonials.href" rel="noopener" target="_blank">{{ t('testimonials.readOnLinkedIn') }}</a>
    </div>

    <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
      <v-card
        v-for="testimonial in testimonials.items"
        :key="testimonial.name"
        class="p-4"
        variant="tonal"
      >
        <figure class="m-0 flex flex-col gap-3 h-full">
          <blockquote class="m-0 leading-relaxed grow">“{{ testimonial.quote }}”</blockquote>

          <figcaption class="text-sm">
            <strong>{{ testimonial.name }}</strong>,
            {{ testimonial.role }}<template v-if="testimonial.company">, {{ testimonial.company }}</template>
          </figcaption>
        </figure>
      </v-card>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
  import type { TestimonialsModel } from '../models'
  import { useI18n } from 'vue-i18n'

  defineProps<{ testimonials: TestimonialsModel }>()

  const { t } = useI18n()
</script>

<style lang="scss" scoped>
</style>
