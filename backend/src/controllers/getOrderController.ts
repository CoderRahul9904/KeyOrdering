import { Request, Response } from 'express';
import { User } from '../db';

export const getOrderController = async (req: any, res: any) => {
//   const userId = req.query.userId as string;
const { userId } = req.body as { userId: string };
  console.log("Fetching orders for userId:", userId);
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const user = await User.findById(userId).lean();
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.list.length === 0) {
      return res.status(200).json({ message: "No orders found for this user." });
    }

    return res.status(200).json({ orders: user.list });
  } catch (err) {
    console.error("Error fetching orders:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
} 

