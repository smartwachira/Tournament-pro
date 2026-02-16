// Standardizing on the 'query' helper for consistency and scope safety
import { query } from '../config/db.js';

export const createTeam = async (req, res) => {
    // Corrected typo: "from"
    // Collect data from the request
    const { name, logo_url } = req.body;

    try {
        const result = await query(
            'INSERT INTO teams (name, logo_url) VALUES ($1, $2) RETURNING *',
            [name, logo_url]
        );
        // 201 Status for successful creation
        res.status(201).json(result.rows[0]);
    } catch (err) {
        // Log the actual error to the server console for debugging
        console.error("Database Error in createTeam:", err.message);
        res.status(500).json({ error: 'Team name must be unique or server error.' });
    }
};

export const getAllTeams = async (req, res) => {
    try {
        const result = await query('SELECT * FROM teams');
        res.json(result.rows);
    } catch (err) {
        console.error("Database Error in getAllTeams:", err.message);
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
};

export const registerTeamToTournament = async (req, res) => {
    const { tournamentId, teamId } = req.body;
    try {
        // Uses the many-to-many junction table to link entities
        const result = await query(
            'INSERT INTO tournament_teams (tournament_id, team_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [tournamentId, teamId]
        );
        res.status(201).json({ message: 'Team registered successfully' });
    } catch (err) {
        // Logging the error is critical to see if foreign key constraints are failing
        console.error("Database Error in registerTeamToTournament:", err.message);
        res.status(500).json({ error: 'Registration failed' });
    }
};