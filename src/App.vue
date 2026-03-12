<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <MainHeader />
    <RouterView />
  </div>
  <MainFooter class="mt-auto" />
</template>
