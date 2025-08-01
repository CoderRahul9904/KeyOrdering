import { login, signup } from '../controllers/authController';
import express from 'express';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;