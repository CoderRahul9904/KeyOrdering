import express from 'express';
import { addOrderController }  from '../controllers/addOrdercontroller';

const router = express.Router();

router.post('/add-order', addOrderController);

export default router;


// router.delete(
//   '/users/:userId/orders/:orderId?',
//   deleteOrderController
// );