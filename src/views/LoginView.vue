<script setup>
import { ref } from "vue";
import { supabase } from "@/supabase/init";
import { useRouter } from "vue-router";
import AppInput from '@/components/AppInput.vue';
import AppButton from '@/components/AppButton.vue';

const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    const errorMsg = ref(null);

    const login = async () => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        router.push('/');
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="max-w-screen-sm mx-auto px-4 py-10">
      <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
        <p class="text-red-500">{{ errorMsg }}</p>
      </div>

      <form @submit.prevent="login" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
        <h1 class="text-3xl text-at-light-green mb-4">Login</h1>

        <div class="flex flex-col mb-2">
          <label for="email" class="mb-1 text-sm text-at-light-green">Email</label>
          <AppInput v-model="email" type="email" id="email" required />
        </div>

        <div class="flex flex-col mb-2">
          <label for="password" class="mb-1 text-sm text-at-light-green">Password</label>
          <AppInput v-model="password" type="password" id="password" required />
        </div>

        <button type="submit" class="bg-green-100 rounded-md text-at-light-green py-2 px-4 mt-4 hover:bg-green-200 transition duration-300 ease-in-out">Login</button>
      </form>

      <div class="mt-4 text-center">
        <router-link to="/signup" class="text-at-light-green">Don't have an account? Sign up</router-link>
      </div>

      <div class="mt-4 text-center">
        <router-link to="/rankings" class="bg-green-100 rounded-md text-at-light-green py-2 px-4 mt-4 hover:bg-green-200 transition duration-300 ease-in-out">Guest access</router-link>
      </div>
    </div>
  </div>
</template>



