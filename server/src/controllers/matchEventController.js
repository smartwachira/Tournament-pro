import  pool  from "../config/db.js";

export const logMatchEvent = async (req, res)=>{
    const {  match_id,player_id,team_id,event_type, event_minute} = req.body;

    // Check out a dedicated client from the database pool
        const client = await pool.connect();
    try {
        //1. Begin Database Transaction logic
        
        // We want to make sure both the event is logged and the score is updated safely.
         //Start the transaction
        await client.query('BEGIN');

        //Insert the event into the match-events table
        const eventResult = await client.query(
            `INSERT INTO   match_events (match_id, player_id, event_type, event_minute)
            VALUES ($1,$2,$3,$4) RETURNING *`,
            [match_id, player_id, event_type,event_minute]
        );

        const newEvent = eventResult.rows[0];

        //2. If the event is a GOAL, automatically update the match score
        if(event_type === 'goal'){
            //Find out if the scoring team is thee home team or away team
            const matchCheck = await client.query(
                `SELECT home_team_id, away_team_id FROM  matches WHERE id=$1`,
                [match_id]
            );

            const match = matchCheck.rows[0];

            if (match.home_team_id === team_id){
                // Increment home score
                await client.query(
                    ` UPDATE matches SET home_score = home_score + 1 WHERE id = $1`, [match_id]   
                );
            } else if (match.away_team_id === team_id){
                //Increment away score
                await client.query(
                    `UPDATE matches SET away_score = away_score + 1 WHERE  id = $1`, [match_id]
                );
            }
        }

        //If everything succeeded, save the changes permanently
        await client.query('COMMIT');

        res.status(201).json({
            message:   `Event '${event_type}' logged successfully!`,
            event: newEvent
        });


    } catch (error){
        await client.query('ROLLBACK');
        console.error("Error logging match event:", error);
        res.status(500).json({ error: 'Failed to log match event'})
    } finally{
        client.release();
    }
};

//Function to fetch all events for a specific match( for the Spectator Timeline)
export const getMatchEvents = async(req,res)=>{
    const {matchId} = req.params;

    try {
        const result = await client.query(
            `SELECT me.*, p.name as player_name
            FROM match_events me
            JOIN players p ON me.player_id = p.id
            WHERE me.match_id = $1
            ORDER BY me.event_minute ASC`,
            [matchId]
        );
        res.status(200).json(result.rows);
    } catch (error){
        console.error("error fetching match events:", error);
        res.status(500).json({error: 'Failed to fetch match events'});
    }
}