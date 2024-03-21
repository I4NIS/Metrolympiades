<template>
  <div>
    <!-- Titre de la page -->
    <h1 class="text-center text-3xl font-bold my-8">Matchs</h1>

    <!-- Liste des matchs -->
    <div v-for="match in matches" :key="match.id" class="border border-gray-300 rounded-md p-4 mb-4">
      <!-- Heure et discipline -->
      <p class="text-center">{{ match.time }} - {{ match.discipline }}</p>

      <!-- Équipes et score -->
      <p class="text-center">{{ match.team1 }} vs {{ match.team2 }}</p>
      <p class="text-center">{{ match.score }}</p>
    </div>
  </div>
</template>

<script setup>
import AppNavBar from "@/components/AppNavBar.vue";

// Données de test pour les matchs (à remplacer par vos propres données)
const matches = [
  {
    id: 1,
    time: "11h04",
    discipline: "Volleyball",
    team1: "SpaceX",
    team2: "Meta",
    score: "8 - 10"
  },
  // Ajoutez d'autres matchs ici selon le même format
];
</script>

<style scoped>
/* Ajoutez vos styles CSS si nécessaire */
</style>
