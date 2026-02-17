//This file handles the "brain  work" for tournament-related requests
import  pool  from '../config/db.js';



//Function  create tournament POST
export const createTournament = async (req,res) =>{
    // 1. Collect data from the request
    const { name, start_date, end_date } = req.body;

    try{
        const result = await pool.query(
            'INSERT INTO tournaments (name, start_date, end_date) VALUES ($1, $2, $3) RETURNING *',
            [name, start_date, end_date]
        );
        res.status(201).json(result.rows[0]);
    } catch (err){
        console.error(err);
        res.status(500).json ({ error: 'Failed to create tournament'});
    }
};

//Function fetch tournaments GET
export const getTournaments = async (req,res) =>{
    try {
        const result = await pool.query(
            'SELECT * FROM tournaments ORDER BY start_date DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch tournaments'});
    }
};

//Get Single Tournament
export const getTournament = async (req,res)=>{
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT * FROM tournaments WHERE id = $1', 
            [id]
        );
        res.json(result.rows);
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error"); // This is where your 500 is coming from!
    }
}

//Get all teams for a specific tournament
export const getTournamentTeams = async (req,res)=>{

    try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT teams.* FROM teams 
       JOIN tournament_teams ON teams.id = tournament_teams.team_id 
       WHERE tournament_teams.tournament_id = $1`, 
      [id]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json( {error: "Failed to fetch tournament teams"}); // This is where your 500 is coming from!
  }
}