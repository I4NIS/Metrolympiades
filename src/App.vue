<script setup>
import { ref, watchEffect } from 'vue';
import AppNavBar from "@/components/AppNavBar.vue";

const showNavBar = ref(true);




</script>
<template>
  <div>
    <AppNavBar v-if="showNavBar"/>
    <router-view/>
  </div>
</template>

<style scoped>
</style>
