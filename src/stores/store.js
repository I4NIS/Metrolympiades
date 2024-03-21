import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from "@/supabase/init";

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const fetchUserProfile = async (teamId) => {
    if (!teamId) {
      user.value = null
      return
    }

    const {data, error} = await supabase.from('teams').select('members').eq('id', teamId).single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return
    } else if(data) {
      user.value = data
    }
  }
  return { user, fetchUserProfile }
})

export const useTeamStore = defineStore('team', () => {
    const team = ref(null)

    const fetchTeamProperties = async (teamId) => {
        if(!teamId){
            team.value = null
            return
        }

        const { data, error } = await supabase.from('teams').select('*').eq('id', teamId).single()

        if (error) {
            console.error('Error fetching user profile:', error)
            return
        } else if(data) {
            user.value = data
        }
    }
    return { team, fetchTeamProperties }
})