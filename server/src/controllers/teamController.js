import { query } from '../config/db.js';



export const createTeam = async (req, res ) =>{
    // Collect data fro the request
    const { name, logo_url } = req.body;

    try {
        const result = await query(
            'INSERT INTO teams (name, logo_url) VALUES ($1, $2) RETURNING *',
            [name, logo_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err){
        res.status(500).json({error: 'Team name must be unique or server error.'});
    }
};

export const getAllTeams = async (req, res) => {
    try {
        const result =await query('SELECT * FROM teams');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch teams'})
    }
};

export const registerTeamToTournament = async (req,res)=> {
    const {tournamentId, teamId} = req.body;
    try{
        const result = await query(
            'INSERT INTO tournament_teams (tournament_id, team_id) VALUES ($1,$2) ON CONFLICT DO NOTHING',
            [tournamentId, teamId]
        );
        res.status(201).json({ message: 'Team registered successfully'})
    } catch (err){
        res.status(500).json({ error: 'Registration failed'})
    }
}