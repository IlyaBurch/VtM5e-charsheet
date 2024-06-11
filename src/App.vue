<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MainHeader from './components/MainHeader.vue';
import MainFooter from './components/MainFooter.vue';
</script>

<template>
  <div class="main">
    <MainHeader/>
    <RouterView />
  </div>
  <MainFooter class="footer"/>
</template>

<style scoped>
.footer{
  margin-top: auto;
}
.main{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>