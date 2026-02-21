
const API_URL = 'http://localhost:5000/api';

const getAuthHeaders =()=>{
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` }:{})
  }
}

//Auth API calls
export const authService = {
  login: async (email,password)=>{
    const response = await  fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ email,password}),
    });
    if (!response.ok){
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    return response.json();
  },
  register: async (userData)=>{
    const response = await fetch(`${API_URL}/auth/register`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userData),
    });
    if (!response.ok){
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }
    return response.json()
  }
}

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
      headers: getAuthHeaders(),
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

  
  //Create Tournament teams
  createAndLinkTeam: async (name, logo_url, tournamentId) =>{
    const response = await fetch(`${API_URL}/teams/create-and-link`,{
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name, logo_url, tournamentId})

    });

    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.error || "Transactional registration failed")
    }
    return response.json();
  },

  //Fetch Tournament matches
  getTournamentMatches: async (tournamentId)=>{
    try {
      const response = await fetch(`${API_URL}/matches/${tournamentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tournament matches');
      }
      return await response.json();
    } catch (err) {
      console.error("Fetch matches error:", err);
      throw err; // Re-throw so the UI component can handle the error
    }
  },
  generateTournamentMatches: async (tournamentId) =>{
    const response = await fetch(`${API_URL}/matches/generate`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({tournamentId})

    });

    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.error || "Matches Generation failed")
    }
    return response.json();
  },

  //New: Join via Passcode
  join: async (joinCode)=>{
    const res = await fetch(`${API_URL}/tournaments/join`,{
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        join_code: joinCode
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to join");
    return data;
  }
};

