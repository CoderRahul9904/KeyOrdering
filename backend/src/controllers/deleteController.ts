// src/controllers/orderController.ts
import { Request, Response, NextFunction } from 'express';
import { User } from '../db';

export const deleteOrderController = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const userId  = req.params.userId  || req.body.userId;
    const orderId = req.params.orderId || req.body.orderId;

    if (!userId || !orderId) {
      return res.status(400).json({ message: "Both userId and orderId are required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { list: { orderId } } },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const stillHas = updatedUser.list.some(item => item.orderId === orderId);
    if (stillHas) {
      return res
        .status(404)
        .json({ message: `Order with orderId "${orderId}" not found for this user.` });
    }

    return res
      .status(200)
      .json({ message: "Order deleted successfully.", orderId });
  } catch (err) {
    next(err);
  }
};
