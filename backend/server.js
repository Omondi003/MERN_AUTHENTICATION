import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './db/connectDB.js';
import userRouter from './routes/auth.route.js'

const app=express();
dotenv.config();

const PORT=process.env.PORT || 5000

// Will allow us to pass incoming request from request body :req.body
app.use(express.json());

app.use("/api/auth", userRouter);

 

app.listen(PORT, ()=> {
    connectDB();
    console.log(`App is running on port ${PORT}`);
})



 
