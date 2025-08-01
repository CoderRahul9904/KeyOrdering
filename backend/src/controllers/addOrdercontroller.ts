
import { User } from '../db';


export const addOrderController = async (req:any, res:any) => {
    const { orderId, srno, createDate, reasonToOrder, description, userId }= req.body as { orderId: string, srno: string | number, createDate: string, reasonToOrder: string, description: string, userId: string };
    console.log("Adding order for userId:", userId);
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }
    console.log("Order details:", { orderId, srno, createDate, reasonToOrder, description });
    if (!orderId || !srno || !createDate || !reasonToOrder || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try{
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.list.push({
      orderId,
      srno,
      createDate: new Date(createDate),
      reasonToOrder,
      description
    });

    const savedUser = await user.save();

    const allOrder = savedUser.list;
    return res
      .status(201)
      .json({ message: "Order added successfully.", order: allOrder });
    } catch (err) {
    console.error("Error adding order:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}