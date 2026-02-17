// Standardizing on the 'query' helper for consistency and scope safety
import { query } from '../config/db.js';
import pool from '../config/db.js';


export const getAllTeams = async (req, res) => {
    try {
        const result = await query('SELECT * FROM teams');
        res.json(result.rows);
    } catch (err) {
        console.error("Database Error in getAllTeams:", err.message);
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
};


export const createAndRegisterTeam = async (req,res)=>{
    const { name, logo_url, tournamentId } = req.body;
    const client = await pool.connect();

    try {
        //Start the ACID Transaction
        await client.query('BEGIN');


        //Create the Team
        const teamResult = await client.query(
            'INSERT INTO teams (name, logo_url) VALUES ($1, $2) RETURNING id',[name, logo_url]
        );
        const teamId = teamResult.rows[0].id;

        //Link the Team to the Tournament
        await client.query(
            'INSERT INTO tournament_teams (tournament_id, team_id) VALUES ($1, $2)',[tournamentId,teamId]
        );

        await client.query('COMMIT');
        res.status(201).json({ success: true, teamId,message:"Team created and registered!"})



    } catch (err){
        await client.query('ROLLBACK');
        console.error("Transaction Error:",err.message);
        res.status(500).json({ error: "Team registration failed. Changes rolled back."})
    } finally{
        client.release()
    }

}

