<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <template #activator="{props: activatorPros}">
      <v-btn
        v-tooltip:left="contactWithName"
        v-bind="activatorPros"
        color="text-blue-700"
        icon="mdi-email"
      />
    </template>

    <template #default>
      <v-card>
        <v-card-text class="pb-0">
          <Form
            id="contact-form"
            class="flex flex-col gap-4"
            :initial-values="{
              subject: contactWithName
            }"
            @submit="onSubmitContact"
          >
            <Field
              v-slot="{ value, handleChange, handleBlur, errorMessage }"
              name="subject"
              :rules="{ required: true }"
            >
              <v-text-field
                clearable
                :error="!!errorMessage"
                :error-messages="errorMessage"
                :label="t('subject')"
                :model-value="value"
                variant="outlined"
                @blur="handleBlur"
                @update:model-value="handleChange"
              />
            </Field>

            <Field
              v-slot="{ value, handleChange, handleBlur, errorMessage }"
              name="body"
              :rules="{ required: true }"
            >
              <v-textarea
                :error="!!errorMessage"
                :error-messages="errorMessage"
                :label="t('body')"
                :model-value="value"
                variant="outlined"
                @blur="handleBlur"
                @update:model-value="handleChange"
              />
            </Field>
          </Form>
        </v-card-text>

        <v-card-actions>
          <v-btn
            :text="t('close')"
            type="button"
            variant="outlined"
            @click="closeDialog"
          />

          <v-btn
            color="primary"
            form="contact-form"
            :text="t('sendEmail')"
            type="submit"
            variant="elevated"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

</template>

<script setup lang="ts">
  import { required } from '@vee-validate/rules'
  import { defineRule, Field, Form } from 'vee-validate'
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  defineRule('required', required)

  const { t } = useI18n()

  const dialog = ref(false)

  const contactWithName = computed(() => `${t('contactWith')} ${t('name')}`)

  function onSubmitContact (values: any): void {
    const { subject, body } = values
    const email = 'denys.slobodianyk@gmail.com'
    const sendEmail = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(sendEmail)
    closeDialog()
    return
  }

  function closeDialog () {
    dialog.value = false
  }
</script>

<style lang="scss">
  .v-input {
    .v-input__details {
      padding-inline: 0 !important;
    }
  }
</style>
