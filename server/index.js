import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './src/config/db.js';
import  tournamentRoutes  from './src/routes/tournamentRoutes.js';
import teamRoutes from './src/routes/teamRoutes.js';
import playerRoutes from './src/routes/playerRoutes.js'
import matchRoutes from './src/routes/matchRoutes.js';

dotenv.config();
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Tournament Routes
app.use('/api/tournaments', tournamentRoutes);

//Team  Routes
app.use('/api/teams',teamRoutes)

//Player Routes
app.use('/api/players',playerRoutes)
//Match Routes
app.use('/api/matches',matchRoutes)




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




const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`🚀 Server sprinting on http://localhost:${PORT}`));