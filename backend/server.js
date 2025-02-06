import express from 'express';

const app=require('express');

app.get('/', (req,res)=> {
    res.send("Authentication code");
})

app.listen(5000, ()=> {
    console.log("App is running on port 3000");
})