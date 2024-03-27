<script setup>
import { ref, defineProps } from 'vue';
import { useMatchStore,useTeamStore } from "@/stores/store.js";
import {storeToRefs} from "pinia";
import AppButton from '@/components/AppButton.vue';


defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});
const { team } = storeToRefs(useTeamStore());
useTeamStore().fetchTeamProperties()

const teamStore = storeToRefs(useTeamStore());
const matchStore = storeToRefs(useMatchStore());

const teams = ref([]); // Liste des équipes
const sports = ref([
  { id: '1', name: 'Foot' },
  { id: '2', name: 'Basket' },
  { id: '3', name: 'Ping Pong' },
  { id: '4', name: 'Tennis' },
  { id: '5', name: 'Course' },
  { id: '6', name: 'Echec' }
]);
const myTeam = team.name
const selectedOpponentTeam = ref('');
const selectedSport = ref();
const selectedTime = ref('');
const team1Score = ref(0);
const team2Score = ref(0);

</script>
<template>
    <form class="flex justify-center items-center flex-col mt-10" >
      <label for="team1">Your Team: {{team.name}}</label>
      <label for="opponentTeam">Opponent Team:</label>

      <select v-model="selectedOpponentTeam">
        <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
      </select>

      <label for="sport">Sport:</label>
      <select v-model="selectedSport">
        <option v-for="sport in sports" :key="sport.id" :value="sport.name">{{ sport.name }}</option>
      </select>

      <label for="time">Time:</label>
      <input type="time" id="time" v-model="selectedTime">

      <div class="flex">
        <label for="team1Score">Your Team Score:</label>
        <input type="number" id="team1Score" v-model.number="team1Score">

        <label for="opponentTeamScore">Opponent Team Score:</label>
        <input type="number" id="opponentTeamScore" v-model.number="team2Score">
      </div>
      <AppButton :buttonText="'Create the Match'" class="mt-10"/>
    </form>

</template>


