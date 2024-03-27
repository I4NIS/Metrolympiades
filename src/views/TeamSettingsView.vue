<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl font-bold mb-4 mt-4">{{ team?.name }}</h1>
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
    <button @click="openModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Ajouter Membre</button>
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-8 max-w-md relative">
        <button @click="closeModal" class="absolute top-0 right-0 p-4 text-3xl">&times;</button>
        <h2 class="text-2xl font-bold mb-4">Ajouter Membre</h2>
        <input type="text" v-model="newMemberName" placeholder="Nom du membre" class="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full">
        <button @click="confirmAddMember" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Valider</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { storeToRefs } from "pinia";
  import { useTeamStore } from '@/stores/store';
  import { ref } from 'vue';

  const { team } = storeToRefs(useTeamStore());
  useTeamStore().fetchTeamProperties();

  const showModal = ref(false);
  const newMemberName = ref('');

  const openModal = () => {
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
  };

  const confirmAddMember = async () => {
    try {
      await useTeamStore().addMemberToTeam(team.value.id, newMemberName.value);
      await useTeamStore().fetchTeamProperties();
      newMemberName.value = ''; 
      closeModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout du membre:", error);
    }
  };

  const removeMember = async (index) => {
    try {
      await useTeamStore().removeMemberFromTeam(team.value.id, index);
      await useTeamStore().fetchTeamProperties();
    } catch (error) {
      console.error("Erreur lors de la suppression du membre:", error);
    }
  }

  const addMember = async () => {
    try {
      await useTeamStore().addMemberToTeam(team.value.id, memberId);
      await useTeamStore().fetchTeamProperties();
    } catch (error) {
      console.error("Erreur lors de l'ajout du membre:", error);
    }
  }
</script>
