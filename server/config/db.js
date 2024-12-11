import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONDODB_URI = process.env.MONDODB_URI;
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONDODB_URI);
        console.log(`MongoDB connected.`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;