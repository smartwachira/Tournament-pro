const API_URL = 'http://localhost:5000/api';

export const tournamentService = {
  
  // Fetch all tournaments
  getAll: async () => {
    const response = await fetch(`${API_URL}/tournaments`);
    if (!response.ok) throw new Error('Failed to fetch tournaments');
    return response.json();
  },

  // Create a new tournament
  create: async (data) => {
    const response = await fetch(`${API_URL}/tournaments/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create tournament');
    return response.json();
  },

  // Fetch one Tournament
  getOne: async (tournamentId) => {
    const response = await fetch(`${API_URL}/tournaments/${tournamentId}`);
    if (!response.ok) throw new Error('Tournament not found');
    return response.json();
  },

  // Fetch Tournament Teams
  getTournamentTeams: async (tournamentId) => {
    try {
      const response = await fetch(`${API_URL}/tournaments/${tournamentId}/teams`);
      if (!response.ok) {
        throw new Error('Failed to fetch tournament teams');
      }
      return await response.json();
    } catch (err) {
      console.error("Fetch teams error:", err);
      throw err; // Re-throw so the UI component can handle the error
    }
  },

  
  
  createAndLinkTeam: async (name, logo_url, tournamentId) =>{
    const response = await fetch(`${API_URL}/teams/create-and-link`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ name, logo_url, tournamentId})

    });

    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.error || "Transactional registration failed")
    }
    return response.json();
  }
};