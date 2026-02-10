import { query } from '../config/db.js';

export const addPlayer = async (req,res)=>{
    const {team_id, name, position,jersey_number} = req.body;
    try {
        const result = await query(
            'INSERT INTO players (team_id, name, position, jersey_number) VALUES ($1, $2, $3, $4) RETURNING *',
            [team_id, name, position, jersey_number]
        );
        res.status(201).json(result.rows[0]);
    } catch (err){
        res.status(500).json({ error: 'Failed to add player'});
    }
}