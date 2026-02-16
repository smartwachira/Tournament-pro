import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './src/config/db.js';
// 1. Correct Named Import (must use curly braces)
import { tournamentRoutes } from './src/routes/tournamentRoutes.js';
// 2. Import Team and Player logic
import { createTeam, getAllTeams } from './src/controllers/teamController.js';
import { addPlayer } from './src/controllers/playerController.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES
// 3. Mount Tournament routes (handles /api/tournaments and /api/tournaments/:id)
app.use('/api/tournaments', tournamentRoutes);

// 4. Mount Team and Player routes
app.post('/api/teams', createTeam);
app.get('/api/teams', getAllTeams);
app.post('/api/players', addPlayer);

// Sandbox Route: Test DB Connection
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await query('SELECT NOW()');
    res.json({
      status: 'Success',
      time: result.rows[0].now,
      message: 'Database is communicating perfectly!'
    });
  } catch (err) {
    console.error("DB Connection Error:", err.message);
    res.status(500).json({ status: 'Error', message: 'Database connection failed.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server sprinting on http://localhost:${PORT}`);
});