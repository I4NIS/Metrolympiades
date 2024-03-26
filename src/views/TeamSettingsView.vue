<script setup>
    import { storeToRefs } from "pinia";
    import { useTeamStore } from '@/stores/store';

    const { team } = storeToRefs(useTeamStore());
    useTeamStore().fetchTeamProperties();

    const removeMember = async (index) => {
        try {
            await useTeamStore().removeMemberFromTeam(team.value.id, index);
            await useTeamStore().fetchTeamProperties();
        } catch (error) {
            console.error("Erreur lors de la suppression du membre:", error);
        }
    }
</script>

<template>
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold mb-4">{{ team?.name }}</h1>
      <div class="border-b-2 w-32 mb-4"></div> 
      <ul>
        <li v-for="(member, index) in team?.members" :key="index" class="flex items-center mb-2">
          <span class="border-2 border-gray-300 rounded-lg p-3 mr-2 hover:bg-gray-400">{{ member }}</span>
          <span v-if="index !== 0" class="cursor-pointer border-2 border-red-500 rounded-full p-1 hover:bg-red-100" @click="removeMember(index)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M14.879 14.879a2 2 0 0 1-2.828 0L10 12.828l-2.828 2.828a2 2 0 1 1-2.828-2.828L7.172 10 4.344 7.172a2 2 0 1 1 2.828-2.828L10 7.172l2.828-2.828a2 2 0 1 1 2.828 2.828L12.828 10l2.828 2.828a2 2 0 0 1 0 2.828z" clip-rule="evenodd" />
            </svg>
          </span>
        </li>
      </ul>
    </div>
  </template>
  
  

