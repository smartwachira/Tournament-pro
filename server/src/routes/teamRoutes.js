import express from 'express';
import { createAndRegisterTeam, getAllTeams } from '../controllers/teamController.js';


const router = express.Router();


router.get('/',getAllTeams);


router.post('/create-and-link', createAndRegisterTeam);

export default router ;