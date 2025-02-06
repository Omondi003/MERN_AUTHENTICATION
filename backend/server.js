import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './db/connectDB.js';

const app=express();
dotenv.config();

app.get('/', (req,res)=> {
    res.send("Authentication code");
})

app.listen(5000, ()=> {
    connectDB();
    console.log("App is running on port 3000");
})



 
