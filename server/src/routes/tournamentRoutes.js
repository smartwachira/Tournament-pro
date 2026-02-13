import express from 'express';
import { createTournament, getTournaments,getTournament,getTournamentTeams } from '../controllers/tournamentController.js';

const router = express.Router();

router.post('/', createTournament);
router.get('/',getTournaments);
router.get('/:id',getTournament);
router.get('/:id/teams',getTournamentTeams)

export default router;