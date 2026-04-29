<template>
  <v-app>
    <Header />

    <v-main>
      <HelloWorld />
    </v-main>

    <Footer />
  </v-app>
</template>

<script lang="ts" setup>
  import HelloWorld from '@/components/HelloWorld.vue'
  import Footer from '@/layout/Footer.vue'
  import Header from '@/layout/Header.vue'
</script>
