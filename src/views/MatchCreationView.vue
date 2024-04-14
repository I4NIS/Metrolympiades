<template>
  <form class="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-md" @submit.prevent="createMatch">
    <div class="mb-4">
      <label for="team1" class="text-gray-700 font-semibold">Your Team:</label>
      <span class="block text-gray-800">{{ team.name }}</span>
    </div>

    <div class="mb-4">
      <label for="opponentTeam" class="text-gray-700 font-semibold">Opponent Team:</label>
      <select v-model="selectedOpponentTeam" class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <option disabled value="">Select Opponent Team</option>
        <option v-for="opponentTeam in opponentTeams" :key="opponentTeam.id" :value="opponentTeam.id">{{ opponentTeam.name }}</option>
      </select>
    </div>

    <div class="mb-4">
      <label for="sport" class="text-gray-700 font-semibold">Sport:</label>
      <select v-model="selectedSport" class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <option v-for="sport in sports" :key="sport.id" :value="sport.name">{{ sport.name }}</option>
      </select>
    </div>

    <div class="mb-4">
      <label for="time" class="text-gray-700 font-semibold">Time:</label>
      <input type="time" id="time" v-model="selectedTime" class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
    </div>

    <div class="flex mb-4">
      <div class="w-1/2 mr-2">
        <label for="team1Score" class="text-gray-700 font-semibold">Your Team Score:</label>
        <input type="number" id="team1Score" v-model.number="team1Score" class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div class="w-1/2 ml-2">
        <label for="opponentTeamScore" class="text-gray-700 font-semibold">Opponent Team Score:</label>
        <input type="number" id="opponentTeamScore" v-model.number="team2Score" class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
    </div>

    <AppButton :buttonText="'Create the Match'" class="w-full"/>
  </form>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useMatchStore, useTeamStore } from "@/stores/store.js";
import { storeToRefs } from "pinia";
import AppButton from '@/components/AppButton.vue';


defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const { team } = storeToRefs(useTeamStore());
useTeamStore().fetchTeamProperties();

const sports = [
  { id: '1', name: 'Foot' },
  { id: '2', name: 'Basket' },
  { id: '3', name: 'Ping Pong' },
  { id: '4', name: 'Tennis' },
  { id: '5', name: 'Course' },
  { id: '6', name: 'Echec' }
];


const { teams } = storeToRefs(useMatchStore());
const opponentTeams = ref([]);

const selectedOpponentTeam = ref('');
const selectedSport = ref('');
const selectedTime = ref('');
const team1Score = ref(0);
const team2Score = ref(0);

const fetchOpponentTeams = async () => {
  try {
    opponentTeams.value = await useMatchStore().fetchOpponentTeams();
    const teamId = team.value.id;
    const teamIndex = opponentTeams.value.findIndex(opponentTeam => opponentTeam.id === teamId);
    if (teamIndex !== -1) {
      opponentTeams.value.splice(teamIndex, 1);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des équipes adverses:", error);
  }
};


fetchOpponentTeams();

const createMatch = async () => {
  try {
    const newMatch = {
      teamId: team.value.id,
      opponentTeamId: selectedOpponentTeam.value,
      sport: selectedSport.value,
      time: selectedTime.value,
      team1Score: team1Score.value,
      team2Score: team2Score.value
    };
    await useMatchStore().createMatch(newMatch);
    resetFields();
  } catch (error) {
    console.error("Erreur lors de la création du match:", error);
  }
};

const resetFields = () => {
  selectedOpponentTeam.value = '';
  selectedSport.value = '';
  selectedTime.value = '';
  team1Score.value = 0;
  team2Score.value = 0;
};

</script>
