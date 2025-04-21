import { user } from '../models/user.models.js'
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'

import { generateTokenAndSetCookie } from '../Utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail } from '../mailtrap/emails.js';
import { sendWelcomeEmail } from '../mailtrap/emails.js';

 
 
export const signup = async (req, res) => {

const {email, password, name}= req.body
    try {
        
        // checking if the user has provided all the details
        if(!email || !password || !name){
            throw new Error("All fields are required")
        }
 
        // check if the user already exists since email is unique
        const userAlreadyExists=await user.findOne({email})

        if (userAlreadyExists){
            return res.status(400).json({success:false, message:"User already exists"})
        }

        // Hash the password once the credentials has passed the above two tests
        const hashedPassword=await bcryptjs.hash(password, 10)

        // Generate a verification token, a six digit random number
        const verificationToken= Math.floor(100000 + Math.random() * 900000).toString();

        // Creating a new user from the models schem
        const User=new user({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 *60 * 1000 //24 hours from now10
 
        })

           // Sending verification email to the user email once logged in
       await sendVerificationEmail(User.email, verificationToken)

        // Save the user to the database
         await User.save();

         //  To show user is logged in and use JWT
        generateTokenAndSetCookie(res, user._id);

           // Sending verification email to the user email once logged in
       await sendVerificationEmail(User.email, verificationToken)

      

        // Sending response after successfuly creating a user. 201=created
        res.status(201).json({
            success:true,
            message: "User created successfully",
            user : {
                ...User._doc,
                password: undefined
            }
        });

    } catch (error) {
        
        res.status(400).json({success:false, message:error.message})
    }
};

export const verifyEmail= async (req,res)=>{

    const {code}= req.body;

    try {

        // Find the user by verification code and expiry of verificationtoken
            const User=await user.findOne({
                verificationToken:code,
                verificationTokenExpiresAt: {$gt:Date.now()}
            })
            console.log(User)

            // message to return if the user is not found
            if(!User){
                return res.status(400).json({success:"false" , message: "Invalid verificationToken"})
            }

            // If the user is found, change the status to for verified to true
            User.isVerified=true,
            User.verificationToken=undefined,
            User.verificationTokenExpiresAt=undefined

            await User.save();
            await sendWelcomeEmail(User.email, User.name);

            res.status(200).json({
                success:true,
                message:"Email verified successfully",
                user : {
                    ...User._doc,
                    password:undefined
                }
            })

        
    } catch (error) {

        console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
        
    }
}

export const login = async (req, res) => {

    const {email, password}=req.body       

      try {
		const User = await user.findOne({ email });
		if (!User) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await bcryptjs.compare(password, User.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(res, User._id);

		User.lastLogin = new Date();
		await User.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...User._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const signout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({success:true, message:"logged out successfully"})
};

export const forgotPassword=async (req,res)=> {
 
    const { email }=req.body

    try {
        const User=await user.findOne({email})
        if(!User){
            res.status(400).json({success:false, message: "user not found"})
        }

        // Generate reset token
        const resetToken=crypto.randomBytes(20).toString(hex)
        const resetTokenExpiresAt=Date.now() + 1 * 60 * 60 * 1000;
        
        User.resetPasswordToken=resetToken;
        User.resePasswordExpiresAt=resetTokenExpiresAt;

        // Saving the user to the database
        await User.save

    } catch (error) {
        
    }
}