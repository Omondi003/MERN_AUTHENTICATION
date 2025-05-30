import mongoose from "mongoose";

export const connectDB= async ()=> {
    
     try{
        console.log("MongoUri :" , process.env.MONGO_URI);
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected , ${conn.connection.host}`)

     }

     catch(error) {
           
        console.log("Error connection to MongoDB", error.message)
        process.exit(1);
     }
} 