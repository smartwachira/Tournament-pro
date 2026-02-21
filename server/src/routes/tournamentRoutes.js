import express from 'express';
import { joinTournament,createTournament, getTournaments,getTournament,getTournamentTeams } from '../controllers/tournamentController.js';
import {protect,adminOnly} from '../middleware/authMiddleware.js'


const router = express.Router();
//Protected Routes(must have valid JWT)
router.post('/',protect,createTournament);
router.post('/join',protect, joinTournament);

//Public Routes
router.get('/',getTournaments);
router.get('/:id',getTournament);
router.get('/:id/teams',getTournamentTeams)

export default router ;