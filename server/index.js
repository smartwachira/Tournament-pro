import express from 'express';
import cors from 'cors';
import { query } from './src/config/db.js';
import tournamentRoutes from './src/routes/tournamentRoutes.js'
import { createTeam ,getAllTeams} from './src/controllers/teamController.js';
import {addPlayer} from './src/controllers/playerController.js'

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use('/api/tournaments', tournamentRoutes);
app.use('api/teams')



//ROUTES
//Health Check Route
app.get('/api/health', (req,res)=>{
    res.status(200).json({
        status: 'Green', 
        message: 'Pitch is ready!'});
});

//Test DB Connection
app.get('/api/test-db',async(req, res)=>{
    try {
        const results = await query('SELECT NOW()');
        res.json({
            status: 'Success',
            time: results.rows[0].now,
            message: "Database is communicating perfectly!"
        });
    } catch (err){
        console.error("Error",err);
        res.status(500).json({
            status: 'Error',
            message: 'Database connection failed.'
        });

    }
});
//ROUTES
app.post('/api/teams',createTeam );
app.get('/api/teams', getAllTeams);
app.post('/api/players', addPlayer)



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`🚀 Server sprinting on http://localhost:${PORT}`));