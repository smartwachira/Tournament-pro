import express from 'express';
import { createTeam,getAllTeams,registerTeamToTournament } from '../controllers/teamController.js';


const router = express.Router();

router.post('/', createTeam);
router.get('/',getAllTeams);
router.post('register',registerTeamToTournament)

export default router ;