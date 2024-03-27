<script setup>
import AppButton from "@/components/AppButton.vue";
import {storeToRefs} from "pinia";
import {useMatchStore} from "@/stores/store.js";

const { match } = storeToRefs(useMatchStore());
useMatchStore().fetchMatchProperties();

</script>

<template>
  <div v-for="item in match" :key="item.id">
    <div class="bg-red-700 mb-5 flex justify-center items-center flex-col">
      <div class="flex">
        <h1>{{ item.time }}</h1>
        <h1>-</h1>
        <h1>{{ item.sport }}</h1>
      </div>
      <div class="flex">
        <h1>{{item.team1}}</h1>
        <h1>vs</h1>
        <h1>{{item.team2}}</h1>
      </div>
      <div class="flex">
        <h1>{{ item.team1_score }}</h1>
        <h1>-</h1>
        <h1>{{ item.team2_score }}</h1>
      </div>
    </div>

  </div>


  <div class="flex justify-center items-end mb-8">
    <router-link to="/creation" class="bg-green-100 px-4 py-2 rounded-md">Create a match</router-link>
  </div></template>

<style scoped>

</style>