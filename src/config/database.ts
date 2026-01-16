import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        // @ts-ignore
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");

    }catch (error){
        console.error(error);
    }
}