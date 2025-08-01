import express from 'express';
import { getOrderController } from '../controllers/getOrderController';

const router = express.Router();

router.post('/get-order', getOrderController);

export default router;