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
  }
};