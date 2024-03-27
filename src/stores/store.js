import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from "@/supabase/init";

export const useTeamStore = defineStore('team', () => {
    const team = ref(null)

    const fetchTeamProperties = async () => {
        const { data: userData } = await supabase.auth.getUser();
        if(userData.user) {
            const { data, error } = await supabase.from('teams').select('*').eq('leader', userData.user.id).single()

            if (error) {
                console.error('Error fetching team:', error)
                return
            } else if(data) {
                team.value = data
            }
        }
    }

    const removeMemberFromTeam = async (teamId, memberIndex) => {
        try {
            const { data: teamData, error: teamError } = await supabase
                .from('teams')
                .select('*')
                .eq('id', teamId)
                .single();
    
            if (teamError) {
                throw new Error(`Error fetching team data: ${teamError.message}`);
            }
    
            if (!teamData) {
                throw new Error(`Team with ID ${teamId} not found.`);
            }
    
            const { members } = teamData;
    
            members.splice(memberIndex, 1);

            const { error: updateError } = await supabase
                .from('teams')
                .update({ members })
                .eq('id', teamId)
                .single();

            if (updateError) {
                throw new Error(`Error updating team data: ${updateError.message}`);
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };

    const addMemberToTeam = async (teamId, memberName) => {
        try {
            const { data: teamData, error: teamError } = await supabase
                .from('teams')
                .select('*')
                .eq('id', teamId)
                .single();

            if (teamError) {
                throw new Error(`Error fetching team data: ${teamError.message}`);
            }

            if (!teamData) {
                throw new Error(`Team with ID ${teamId} not found.`);
            }

            const { members } = teamData;

            members.push(memberName);

            const { error: updateError } = await supabase
                .from('teams')
                .update({ members })
                .eq('id', teamId)
                .single();

            if (updateError) {
                throw new Error(`Error updating team data: ${updateError.message}`);
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };
    return { team, fetchTeamProperties, removeMemberFromTeam, addMemberToTeam }
});

export const useTeamsStore = defineStore('teams', () => {
    const teams = ref(null);

    const fetchTeamsProperties = async () => {
        const { data, error } = await supabase.from('teams').select('*');
        
        if (error) {
            console.error('Error fetching match:', error)
            return
        } else if(data) {
            teams.value = data
        }
    }
    return { teams, fetchTeamsProperties }
})

export const useMatchStore = defineStore('match', () => {
    const match = ref(null) 

    const fetchMatchProperties = async () => {
        const { data, error } = await supabase.from('matchs').select('*');

        if (error) {
            console.error('Error fetching match:', error)
            return
        } else if(data) {
            match.value = data
        }
    }
    return { match, fetchMatchProperties }
})