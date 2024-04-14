import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from "@/supabase/init";

export const useTeamStore = defineStore('team', () => {
    const team = ref(null)
    const teamName = ref(null)

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

    const fetchTeamName = async (teamId) => {
        const { data, error } = await supabase.from('teams').select('name').eq('id', teamId).single();

        if (error) {
            console.error('Error fetching team name:', error);
            return null;
        } else {
            return data;
        }
    };

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

    const updateTeamName = async (teamId, newName) => {
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
            //console.log(teamData)
            // Vérifier si le champ members est null
            const updatedMembers = members === null ? [] : members;

            const { error: updateError } = await supabase
                .from('teams')
                .update({ name: newName, members: updatedMembers })
                .eq('id', teamId);

            if (updateError) {
                throw new Error(`Error updating team data: ${updateError.message}`);
            }

            teamName.value = newName;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };


    const updateTeamMembers = async (teamId, updatedMembers) => {
        try {
            const { error } = await supabase
                .from('teams')
                .update({ members: updatedMembers }) // Met à jour la liste des membres
                .eq('id', teamId);

            if (error) {
                throw new Error(`Erreur lors de la mise à jour des membres de l'équipe: ${error.message}`);
            }
            team.value.members
            team.value.members = updatedMembers; // Met à jour la valeur locale des membres dans le store
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };

    return {
        team,
        fetchTeamProperties,
        removeMemberFromTeam,
        addMemberToTeam,
        fetchTeamName,
        updateTeamName,
        updateTeamMembers
    }

});


export const useTeamsStore = defineStore('teams', () => {
    const teams = ref(null);

    const fetchTeamsProperties = async () => {
        const { data, error } = await supabase.from('teams').select('*');

        if (error) {
            console.error('Error fetching teams:', error)
            return
        } else if(data) {
            teams.value = data
        }
    };

    const fetchAllTeams = async () => {
        try {
            const { data, error } = await supabase.from('teams').select('*');

            if (error) {
                throw new Error(`Erreur lors de la récupération des équipes: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };

    return { teams, fetchTeamsProperties, fetchAllTeams }
});


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

    const fetchOpponentTeams = async () => {
        try {
            const { data, error } = await supabase.from('teams').select('id, name');

            if (error) {
                throw new Error(`Erreur lors de la récupération des équipes adverses: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };

    const createMatch = async (matchData) => {
        try {
            const { data, error } = await supabase.from('matchs').insert([
                {
                    created_at: new Date(),
                    team1: matchData.teamId,
                    team2: matchData.opponentTeamId,
                    sport: matchData.sport,
                    time: matchData.time,
                    team1_score: matchData.team1Score,
                    team2_score: matchData.team2Score
                }
            ]);

            if (error) {
                throw new Error(`Erreur lors de la création du match: ${error.message}`);
            }

            console.log("Match créé avec succès:", data);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };

    return { match, fetchMatchProperties, fetchOpponentTeams, createMatch}
});
