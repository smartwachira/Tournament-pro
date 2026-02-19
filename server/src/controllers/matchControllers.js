import  {query} from '../config/db.js';

export const generateFixtures = async(req,res)=>{
    const { tournamentId } = req.body;

    try {
        // 1. Get all teams in this tournament
        const teamsResult = await query(
            'SELECT team_id FROM tournament_teams WHERE tournament_id = $1',[tournamentId]
        );
        const teams= teamsResult.rows;

        if (teams.length < 2){
            return res.status(400).json({error: 'Need at least 2 teams to generate fixtures.'})
        }

        //2. Generate Pairs (Round Robin)
        const matches = [];
        for (let i = 0;i<teams.length;i++){
            for (let j=i+1;j<teams.length; j++){
                matches.push({
                    home: teams[i].team_id,
                    away: teams[j].team_id
                });
            }
        }

        //3. Bulk Insert (Using a loop for simplicity, can be optimised later)
        // We insert each match with status 'scheduled'
        if (matches.length > 0){
            const values=[];
            const placeholders = [];
            let placeholderIndex = 1;

            matches.forEach(match =>{
                //Push the actual data into a flat 1D array
                values.push(tournamentId,match.home,match.away);
                //Create the ($1,$2,$3) string for this specific row
                placeholders.push(`($${placeholderIndex}, $${placeholderIndex + 1},$${placeholderIndex + 2}, 'scheduled')`);
                //Increment our counter by 3 for the next loop
                placeholderIndex +=3;
            });

            const queryText = `
                INSERT INTO matches (tournament_id,home_team_id,away_team_id,status)
                VALUES ${placeholders.join(', ')}
            `;

            //Execute ONE single query
            await query(queryText,values);
        }

        res.status(201).json({
            message: `Successfully generated ${matches.length} matches.`,
            count: matches.length
        });
    } catch  (err){
        console.error(err);
        res.status(500).json({ error: 'Failed to generate fixtures'});
    }
};

export const getMatches = async (req,res)=>{
    const {tournamentId}=req.params;
    try {
        const result = await query(
            `SELECT m.*,
                    t1.name as home_team,
                    t2.name as away_team
            FROM matches m
            JOIN teams t1 ON m.home_team_id = t1.id
            JOIN teams t2 ON m.away_team_id = t2.id
            WHERE m.tournament_id = $1
            ORDER BY m.id ASC`,
            [tournamentId]
        );
        res.json(result.rows);
    } catch (err){
        res.status(500).json({error: 'Failed to fetch matches'});
    }
};
