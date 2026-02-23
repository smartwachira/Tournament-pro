import express from 'express';
import { logMatchEvent, getMatchEvents } from '../controllers/matchEventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔒 Only Referees/Admins should log events (for now we use standard protect)
router.post('/',protect,logMatchEvent);

// 🔓 Anyone (Spectators) can view the events timeline
router.get('/:matchId',getMatchEvents);

export default router;