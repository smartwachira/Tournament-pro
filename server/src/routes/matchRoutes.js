import express from 'express';
import {generateFixtures, getMatches} from '../controllers/matchControllers.js';

const router = express.Router();

router.post('/generate', generateFixtures);
router.get('/:tournamentId', getMatches);

export default router;