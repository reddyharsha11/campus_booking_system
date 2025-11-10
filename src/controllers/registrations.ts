import { Request, Response } from "express";
import bcrypt from "bcrypt";  
import jwt from 'jsonwebtoken'; 

import roomBookingUserModel from "../models/usersmodel.js";

const registration = async(request:Request, response:Response)=>{
    const{username, email, password, role}=request.body
    try{
        const checkuser = await roomBookingUserModel.findOne({email});

        if(checkuser){
            return response.status(400).json({message:"User Already Exists Please Login"})
        }
        else{
            const hashedPassword= await bcrypt.hash(password, 10);
            const newUser = new roomBookingUserModel({
                username,
                email,
                password: hashedPassword,
                role
            });
            await newUser.save();
            return response.status(200).json({message:"Registered Successfully, Please Login"});
        }
    }
    catch(err){
        return response.status(500).json({message:`Server Error`, err});
    }
}



const login = async(request:Request, response:Response)=>{
    const {email, password}=request.body;
    
    try{

        const checkuser = await roomBookingUserModel.findOne({email});

        if(!email || !password){
            return response.status(400).json({message:"Please Provide Both The Fields"})
        }
        else if(!checkuser){
            return response.status(400).json({message:"User Doesn't Exists Please Register"})
        }
        else{
            const jwtToken= jwt.sign({username:checkuser.username, email:checkuser.email, role:checkuser.role}, "jwtsecretkey", {expiresIn:"24h"});
            return response.status(200).json({message:"Log In Sucess", token:jwtToken, username:checkuser.username})
        }

    }
    catch(err){
        return response.status(500).json({message:'Server Error', err})
    }
}


export {registration, login}