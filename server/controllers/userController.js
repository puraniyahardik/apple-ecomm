import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const CreateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET)
}

//route for user login
export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;

        // check if user exists or not
        const user=await userModel.findOne({email});
        if(!user)
        {
            return res.json({success:false,message:"User Does not Exists!"})
        }
        //validationg email format & strong password
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"Please Enter A Valid Email Address!"})
        }
        if(password.length < 8)
        {
            return res.json({success:false,message:"Please Enter A Strong Password!"})
        }
        //campare password
        const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch)
        {       const token=CreateToken(user._id)
                console.log('UserToken:',token)
                return res.json({success:true,token})
        }
        else{
            return res.json({success:false,message:"Invalid Credentails"})
        }

    
    } catch (error) {
        console.log("Login ERROR:",error)
        res.json({success:false,message:error.message})
    }
}

//route for user registor
export const registorUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;

        // check if user exists or not
        const exists=await userModel.findOne({email});
        if(exists)
        {
            return res.json({success:false,message:"User Already Exists!"})
        }
        //validationg email format & strong password
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"Please Enter A Valid Email Address!"})
        }
        if(password.length < 8)
        {
            return res.json({success:false,message:"Please Enter A Strong Password!"})
        }

        //Hash The user Password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user=await newUser.save()

        const token=CreateToken(user._id)

        console.log(token);

        res.json({success:true,token})
    
    } catch (error) {
        console.log("REGISTOR ERROR:",error)
        res.json({success:false,message:error.message})
    }
}

//route for admin login
export const adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD)
        {
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            console.log(token)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"INVALID CREDENTIALS"})
        }
    } catch (error) {
        console.log("ADMIN LOGIN ERROR:",error)
        res.json({success:false,message:error.message})
    }
}