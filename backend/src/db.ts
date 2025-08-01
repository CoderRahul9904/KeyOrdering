// import { OrderQueue } from './models/orderQueue';
import { User } from './models/userModel';
import dotenv from 'dotenv'; 
import { connect } from "mongoose";
dotenv.config({ path: `${__dirname}/../../.env` });


const MONGO_URI = process.env.MONGO_URI!;
console.log("Connecting to MongoDB...");

const connectDB = async () => {
    try {
        await connect(MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

connectDB();

export {
    User,
}