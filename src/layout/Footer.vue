<template>
  <v-footer app height="60px">
    <p class="mx-auto">&copy;{{ year }}</p>
  </v-footer>
</template>

<script setup>
  const year = new Date().getFullYear()
</script>
