import { user } from '../models/user.models.js'
import bcryptjs from 'bcryptjs'
 
export const signup = async (req, res) => {

const {email, password, name}= req.body
    try {
        
        // checking if the user has provided all the details
        if(!email || !password || !name){
            throw new Error("All fields are required")
        }
 
        // check if the user already exists since email is unique
        const userAlreadyExists=await User.findOne({email})

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

        // Save the user to the database
         await User.save();

        //  To show user is logged in and use JWT
        generateTokenAndSetCookie(res, user._id);

        // Sending response after successfuly creating a user. 201=created
        res.status(201).json({
            success:true,
            message: "User created successfully",
            user : {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        
        res.status(400).json({success:false, message:error.message})
    }
};






export const login = async (req, res) => {
    res.send("Login");
};

 

export const signout = async (req, res) => {
    res.send("Signout");
};
