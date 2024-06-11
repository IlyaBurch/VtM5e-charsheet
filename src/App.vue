<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MainHeader from './components/MainHeader.vue';
import MainFooter from './components/MainFooter.vue';
</script>

<template>
  <MainHeader/>
  <RouterView class="main"/>
  <MainFooter class="footer"/>
</template>

<style scoped>
.footer{
    position: fixed;
    bottom: 0;
}
.main{
  padding-bottom: 75px;
}
</style>