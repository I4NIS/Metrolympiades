<script setup>
import { ref } from "vue";
import { supabase } from "@/supabase/init";
import { useRouter } from "vue-router";
import { useUserStore, useTeamStore } from '@/stores/store';
import { storeToRefs } from "pinia";

const { team } = storeToRefs(useTeamStore());

useTeamStore().fetchTeamProperties()
const router = useRouter();

const logout = async () => {
  await supabase.auth.signOut();

  await router.push({name: 'login'});
}
const login = ref(false)

supabase.auth.onAuthStateChange((event, session) => {
  login.value = session !== null;
});

const showMenu = ref(false);
</script>

<template>
  <div>
    <div class="bg-gray-100">
      <nav class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
        <div class="flex items-center justify-between">
          <router-link v-if="login" to="/" class="text-xl font-bold text-gray-800 md:text-2xl hover:text-blue-400">
              {{ team?.name }}
          </router-link>
          <div @click="showMenu = !showMenu" class="flex md:hidden">
            <button type="button" class="text-gray-800 hover:text-gray-400 focus:outline-none focus:text-gray-400">
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                    fill-rule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <ul :class="showMenu ? 'flex' : 'hidden'" class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0">
          <li v-if="login" class="text-sm font-bold text-gray-800 hover:text-blue-400">
            <RouterLink to="/settings">Team Settings</RouterLink>
          </li>
          <li class="text-sm font-bold text-gray-800 hover:text-blue-400">
            <RouterLink to="/rankings">Ranking</RouterLink>
          </li>
          <li v-if="login" class="text-sm font-bold text-gray-800 hover:text-blue-400">
            <RouterLink to="/">Matchs</RouterLink>
          </li>
          <li v-if="login" class="text-sm font-bold text-gray-800 hover:text-blue-400">
            <button class="ml-auto" @click="logout" >Logout</button>
          </li>
          <li v-if="!login" class="text-sm font-bold text-gray-800 hover:text-blue-400">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="!login" class="text-sm font-bold text-gray-800 hover:text-blue-400">
            <router-link to="/signup">Sign Up</router-link>
          </li>


        </ul>
      </nav>
    </div>
  </div>
</template>
