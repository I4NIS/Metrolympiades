<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl font-bold mb-4 mt-4">
      <span v-if="!editingName">{{ team?.name }}</span>
      <input v-else type="text" v-model="editedTeamName" class="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full">
      <span v-if="!editingName && team.name" @click="startEditingName" class="cursor-pointer text-blue-500 hover:underline ml-2">Modifier</span>
      <span v-else-if="team.name" @click="finishEditingName" class="cursor-pointer text-blue-500 hover:underline ml-2 block mx-auto text-center">Valider</span>
    </h1>
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
    <button v-if="!team.name" @click="openCreateTeamModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Créer une équipe</button>
    <button v-else @click="openModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Ajouter Membre</button>
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-8 max-w-md relative">
        <button @click="closeModal" class="absolute top-0 right-0 p-4 text-3xl">&times;</button>
        <h2 class="text-2xl font-bold mb-4" v-if="!team.name">Créer une équipe</h2>
        <h2 class="text-2xl font-bold mb-4" v-else>Ajouter Membre</h2>
        <input v-if="!team.name" type="text" v-model="newTeamName" placeholder="Nom de l'équipe" class="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full">
        <input v-else type="text" v-model="newMemberName" placeholder="Nom du membre" class="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full">
        <button v-if="!team.name" @click="createTeam" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Créer</button>
        <button v-else @click="confirmAddMember" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Valider</button>
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
const newTeamName = ref('');
const editedTeamName = ref('');
const editingName = ref(false);

const openModal = () => {
  showModal.value = true;
};

const openCreateTeamModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const confirmAddMember = async () => {
  try {
    if (team.value.members.length >= 5) {
      throw new Error("L'équipe a déjà atteint le nombre maximum de membres.");
    }

    await useTeamStore().addMemberToTeam(team.value.id, newMemberName.value);
    await useTeamStore().fetchTeamProperties();
    newMemberName.value = '';
    closeModal();
  } catch (error) {
    alert(error.message);
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

const createTeam = async () => {
  try {
    const {data, error} = await useTeamStore().fetchTeamName(team.value.id);

    if (error) {
      console.error("Erreur lors de la récupération du nom de l'équipe:", error);
      return;
    }

    if (data) {
      console.log("L'équipe existe déjà avec le nom:", data.name);
      closeModal();
      return;
    }

    await useTeamStore().updateTeamName(team.value.id, newTeamName.value);
    await useTeamStore().fetchTeamProperties();
    closeModal();
  } catch (error) {
    console.error("Erreur lors de la création de l'équipe:", error);
  }
}

const startEditingName = () => {
  editedTeamName.value = team.value.name;
  editingName.value = true;
};

const finishEditingName = async () => {
  try {
    await useTeamStore().updateTeamName(team.value.id, editedTeamName.value);
    await useTeamStore().fetchTeamProperties();
    editingName.value = false;
  } catch (error) {
    console.error("Erreur lors de la modification du nom de l'équipe:", error);
  }
};
</script>
