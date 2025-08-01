import express from "express";
import { deleteOrderController } from "../controllers/deleteController";

const router = express.Router();

router.delete(
  "/users/:userId/orders/:orderId",
  deleteOrderController
);

router.delete(
  "/orders",
  deleteOrderController
);

export default router;
