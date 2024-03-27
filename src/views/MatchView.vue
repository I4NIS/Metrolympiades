<script setup>
import AppButton from "@/components/AppButton.vue";
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useMatchStore } from "@/stores/store.js";
import { useTeamStore } from '@/stores/store';

const { match } = storeToRefs(useMatchStore());
const matches = ref([]);

const fetchMatches = async () => {
  await useMatchStore().fetchMatchProperties();
  match.value.forEach(async match => {
    const time = match.time;
    const sport = match.sport;
    const team1 = await getTeamName(match.team1);
    const team2 = await getTeamName(match.team2);
    const score1 = match.team1_score;
    const score2 = match.team2_score;
    matches.value.push({ team1, team2, score1, score2, time, sport });
  });
};

const getTeamName = async (teamId) => {
  try {
    const teamName = await useTeamStore().fetchTeamName(teamId);
    return teamName.name;
  } catch (error) {
    console.error('Error getting team name:', error.message);
    throw error;
  }
};

function scoreClass(score1, score2) {
  if (score1 > score2) {
    return 'text-green-500'; 
  } else if (score1 < score2) {
    return 'text-red-500';
  } else {
    return 'text-orange-500'; 
  }
}

fetchMatches();
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-for="item in matches" :key="item.id" class="bg-gray-200 rounded-lg shadow-md p-6 mb-4">
      <div class="flex justify-between mb-4">
        <div class="text-lg font-bold">{{ item.time }}</div>
        <div class="text-lg font-bold">{{ item.sport }}</div>
      </div>
      <div class="flex justify-between mb-4">
        <div class="flex items-center space-x-2">
          <div :class="scoreClass(item.score1, item.score2)">
            <span class="font-bold text-xl">{{ item.team1 }}</span>
          </div>
        </div>
        <div class="font-semibold">vs</div>
        <div class="flex items-center space-x-2">
          <div :class="scoreClass(item.score2, item.score1)">
            <span class="font-bold text-xl text-right">{{ item.team2 }}</span>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="text-4xl font-bold"> {{ item.score1 }} - {{ item.score2 }}</div>
      </div>
    </div>
    <div class="flex justify-end">
      <AppButton :buttonText="'Create a match'" />
    </div>
  </div>
</template>



