import mongoose from "mongoose";

// Timestamps true ensures created and updated time will automatically be added to the document
const userSchema=new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
   
    password :{
         type: String,
         required: true
    },

    name :{
        type:String,
        required:true
    },
    lastLogin : {
        type:Date,
        Default:Date.now()
    },
    isVerified : {
         type:Boolean,
         Default:false
    }, 

    resetPasswordToken:String,
    resePasswordExpiresAt: Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date


}, {timestamps:true})


export const user = mongoose.model("User", userSchema);