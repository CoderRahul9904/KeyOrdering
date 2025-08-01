// import mongoose from 'mongoose';
// import dotenv from 'dotenv'; 
// import { Schema, model } from 'mongoose';
// import { connect } from "mongoose";
// dotenv.config({ path: `${__dirname}/../../.env` });   


// interface IOrder {
//     userId: string;
//     orderId: string;
//     srno: string | number;
//     createDate: Date;
//     reasonToOrder: string;
//     description: string;
// }

// const orderSchema = new Schema({
//     userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
//     orderId: { type: String, required: true, unique: true },
//     srno: { type: Schema.Types.Mixed, required: true },
//     createDate: { type: Date, required: true }, 
//     reasonToOrder: { type: String, required: true },
//     description: { type: String, required: true }
// })

// const OrderQueue = model<IOrder>('OrderQueue', orderSchema);



// export {
//     OrderQueue,
//     IOrder,
// }