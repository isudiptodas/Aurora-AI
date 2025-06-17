import mongoose from "mongoose";

export const connectDb = async () => {
    const URI = process.env.MONGODB_URI as string;

    try {
        await mongoose.connect(URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000
        });
        console.log("Database connected");
    } catch (err) {
        console.log(err);
    }
    
}