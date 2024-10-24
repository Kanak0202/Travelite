import User from "../models/User.js";

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

//cookies
import { jwtCookieOptions } from "../config/cookieOptions.js";

const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId);
        
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        
        await user.save({validateBeforeSave: false});
        
        return {accessToken, refreshToken};
    }catch(error){
        return response.status(500).json({error: error.message, msg: "Something went wrong while generating tokens"});
    }
}

export const signup = async(request, response)=>{
    try{
        let exist = await User.findOne({email: request.body.email});
        if(exist){
            return response.status(200).json({msg:'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = {name: request.body.name, password: hashedPassword, email:request.body.email, country:request.body.country, state:request.body.state, city:request.body.city, rewardPoints:100};
        const newUser = new User(user);
        await newUser.save();
        return response.status(200).json(newUser);
    }catch(error){
        return response.status(500).json(error.message);
    }
}

export const login = async(request, response)=>{
    try{
        if(request.body.email && request.body.password){
            let user = await User.findOne({email: request.body.email});
            
            if(!user){
                return response.status(400).json({msg: "User not found in records"});
            }
            let match = await bcrypt.compare(request.body.password, user.password);
            if(match){
                const userData = {name:user.name, email:user.email, userId:user._id, rewardPoints:user.rewardPoints}
                
                //access and refresh token
            const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
            
            return response.cookie("accessToken", accessToken, jwtCookieOptions).cookie("refreshToken", refreshToken, jwtCookieOptions).status(200).json({userData: userData, accessToken: accessToken, refreshToken: refreshToken});
            }else if(!match){
                return response.status(404).json({msg: "Invalid Password"});
            }
        }
    }catch(error){
        return response.status(500).json(error.message);
    }
}

export const logoutUser = async(request, response)=>{
    await User.findByIdAndUpdate(request.user._id, {$set: {refreshToken: undefined}}, {new: true});

    return response.status(200).clearCookie("accessToken", jwtCookieOptions).clearCookie("refreshToken", jwtCookieOptions).json({msg: "User logged out successfully"});
}

export const refreshAccessToken = async(request, response)=>{
    
    try{
        const incomingRefreshToken = request.cookies.refreshToken || request.body.refreshToken;
        
        
        if(!incomingRefreshToken){
            return response.status(401).json({msg: "Unauthorized request"});
        }

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_SECRETKEY);
        const user = await User.findById(decodedToken?._id);
        
        if(!user){
            return response.status(404).json({msg: "Invalid refresh token"});
        }

        if(incomingRefreshToken !== user?.refreshToken){
            return response.status(404).json({msg: "Refresh token has expired"});
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

        const userData = {
            name: user.name, email: user.email, userId: user._id
        }

        return response.status(200).cookie("accessToken", accessToken, jwtCookieOptions).cookie("refreshToken", refreshToken, jwtCookieOptions).json({userData, accessToken: accessToken, refreshToken: refreshToken, msg:"Access token refreshed successfully"});
    }catch(error){
        return response.status(500).json({error: error.message, msg: "Could not refresh access token"});
    }
}