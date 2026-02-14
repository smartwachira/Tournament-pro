

const API_URL = 'http://localhost:5000/api';


export const tournamentService = {
  
  // Fetch all tournaments
  getAll: async () => {
    const response = await fetch(`${API_URL}/tournaments`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  // Create a new tournament
  create: async (data) => {
    const response = await fetch(`${API_URL}/tournaments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  //Fetch one Tournament
  getOne: async (tournamentId)=>{
    
    const response = await fetch(`${API_URL}/tournaments/${tournamentId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  //Fetch Tournament Teams
  getTournamentTeams: async (tournamentId)=>{
    const response = await fetch(`${API_URL}/tournaments/${tournamentId}/teams`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  // Create a new team
  createTeam: async (teamName) => {
    const response = await fetch(`${API_URL}/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: teamName}),
    });
    return response.json();
  },

  //Link to Tournament
   linkToTournament : async (tournamentId, team) => {
    const response = await fetch(`${API_URL}/teams/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({tournamentId, teamId: team.id}),
    });
    return response.json();
  },


};