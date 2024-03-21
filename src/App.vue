<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import AppNavBar from "@/components/AppNavBar.vue";

const showNavBar = ref(true);
const route = useRoute();

watchEffect(() => {
  const currentPath = route.path;
  showNavBar.value = !(currentPath === '/login' || currentPath === '/signup');
});
</script>

<template>
  <div>
    <AppNavBar v-if="showNavBar"/>
    <router-view/>
  </div>
</template>

<style scoped>
</style>
