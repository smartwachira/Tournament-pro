//This file handles the "brain  work" for tournament-related requests
import { query } from '../config/db.js';


//Function  create tournament POST
export const createTournament = async (req,res) =>{
    // 1. Collect data from the request
    const { name, start_date, end_date } = req.body;

    try{
        const result = await query(
            'INSERT INTO tournaments (name, start_date, end_date) VALUES ($1, $2, $3) RETURNING *',
            [name, start_date, end_date]
        );
        res.status(500).json(result.rows[0]);
    } catch (err){
        console.error(err);
        res.status(500).json ({ error: 'Failed to create tournament'});
    }
};

//Function fetch tournaments GET
export const getTournaments = async (req,res) =>{
    try {
        const result = await query('SELECT * FROM tournaments ORDER BY start_date DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch tournaments'});
    }
};