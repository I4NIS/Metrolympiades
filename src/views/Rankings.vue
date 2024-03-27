<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useMatchStore } from '@/stores/store';
import { useTeamsStore } from '@/stores/store';

const { teams } = storeToRefs(useTeamsStore());
const { match } = storeToRefs(useMatchStore());

let leaderboard = ref([]);

const fetchTeams = async () => {
  await useTeamsStore().fetchTeamsProperties(); 
  teams?.value.forEach(team => {
    const equipe = team.name
    const wins = getWinsForTeam(team.id);
    leaderboard.value.push({ equipe: equipe, wins: wins });
  });
  sortLeaderboard(); 
}

const fetchMatches = async () => {
  await useMatchStore().fetchMatchProperties(); 
}

fetchMatches(); 
fetchTeams(); 

const getWinsForTeam = (teamId) => {
  if (!match.value) return 0;

  let wins = 0;

  match.value.forEach(match => {
    if ((match.team1 === teamId && match.team1_score > match.team2_score) || 
        (match.team2 === teamId && match.team2_score > match.team1_score)) {
      wins = wins+3;
    } 
  });
  return wins;
};

const sortLeaderboard = () => {
  leaderboard.value.sort((a, b) => b.wins - a.wins); 
};

</script>

<template>
  <div>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Équipe
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Victoires
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(team, index) in leaderboard" :key="index">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10">
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">{{ team.equipe }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ team.wins }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

