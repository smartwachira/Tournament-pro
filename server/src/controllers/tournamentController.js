//This file handles the "brain  work" for tournament-related requests
import  {query}  from '../config/db.js';

import crypto from "crypto";



//Function  create tournament POST
export const createTournament = async (req,res) =>{
    // 1. Collect tournament details from the request body
    const { name, start_date, end_date, format } = req.body;

    //2. Extract the user ID from the JWT token 
    const creator_id = req.user.id;

    try{

        //3. Generate a 6-character alphanumeric join code (e.g 'A1B2C3')
        const joinCode = crypto.randomBytes(3).toString('hex').toUpperCase();
        // 4. Insert into the database
        const result = await query(
            'INSERT INTO tournaments (name, start_date, end_date,format,creator_id,join_code) VALUES ($1, $2, $3,$4,$5,$6) RETURNING *',
            [name, start_date, end_date,format || 'league',creator_id,joinCode]
        );

        //5. Send the success response with the new code!
        
        res.status(201).json({
            message: 'Tournament created successfully!',
            tournament: result.rows[0],
            shareable_invite: `Share this code with your league: ${joinCode}`
        });
    } catch (err){
        console.error(err);
        res.status(500).json ({ error: 'Failed to create tournament'});
    }
};

//Function fetch tournaments GET
export const getTournaments = async (req,res) =>{
    try {
        const result = await query(
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
        const result = await query(
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
    const result = await query(
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

//Join a tournament using a passcode
export const joinTournament = async (req,res)=>{
    const {join_code} = req.body;
    const user_id = req.user.id; //From the authMiddleware

    if (!join_code){
        return res.status(400).json({
            error: "Please provide a join code."
        });
    }

    try {
        // 1. Find the tournament by its unique code
        const tourneyResult = await query(
            'SELECT id, name FROM tournaments WHERE join_code = $1',
            [join_code.toUpperCase()]
        );

        if (tourneyResult.rows.length === 0){
            return res.status(404).json({error: 'Invalid join code. Tournament not found.'})
        }
        const tournament = tourneyResult.rows[0]

        //2. Add the user to spectators list
        //On CONFLICT DO NOTHING ensures if they already joined, the app doesn't crash
        await query(
            'INSERT INTO tournament_spectators (user_id, tournament_id) VALUES ($1,$2) ON CONFLICT DO NOTHING',
            [user_id, tournament.id] 
        )

        res.status(200).json({
            message: `Successfully joined ${tournament.name} as a spectator`,
            tournament_id: tournament.id,
            tournament_name: tournament.name
        });
    } catch (err){
        console.error("Join error:",err);
        res.status(500).json({
            error: "Failed to join tournament"
        });
    }
}