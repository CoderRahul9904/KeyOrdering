import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import { Schema, model } from 'mongoose';
dotenv.config({ path: `${__dirname}/../../.env` });   



export interface IListItem {
  orderId: string;
  srno: any;
  createDate: Date;
  reasonToOrder: string;
  description: string;
}

const listItemSchema = new Schema<IListItem>(
  {
    orderId:   { type: String, required: true },
    srno:      { type: Schema.Types.Mixed, required: true },
    createDate:{ type: Date, required: true },
    reasonToOrder: { type: String, required: true },
    description:   { type: String, required: true }
  },
  { _id: false }  
);

interface IUser {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    createdAt: Date;
    list: IListItem[];
}

const userSchema = new Schema({
    // orderId:{ type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: 'OrderQueue' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    list: {
      type: [listItemSchema],
      default: [],        
      required: true
    }
})

const User = model<IUser>('User', userSchema);


export {
    User,
    IUser,
}