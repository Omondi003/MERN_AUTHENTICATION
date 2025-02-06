import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './db/connectDB.js';
import userRouter from './routes/auth.route.js'

const app=express();
dotenv.config();

app.use("/api/auth", userRouter);

 

app.listen(5000, ()=> {
    connectDB();
    console.log("App is running on port 3000");
})



 
