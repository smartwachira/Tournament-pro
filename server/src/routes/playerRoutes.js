import express from 'express';
import { addPlayer } from '../controllers/playerController.js';


const router = express.Router();

router.post('/', addPlayer);

export default router ;