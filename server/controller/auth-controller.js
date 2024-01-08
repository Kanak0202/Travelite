import User from "../models/User.js";

import bcrypt from "bcrypt";

export const signup = async(request, response)=>{
    try{
        let exist = await User.findOne({email: request.body.email});
        if(exist){
            return response.status(200).json({msg:'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = {name: request.body.name, password: hashedPassword, email:request.body.email, country:request.body.country, state:request.body.state, city:request.body.city};
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
                const userData = {name:user.name, email:user.email}
                return response.status(200).json({userData: userData});
            }
        }
    }catch(error){
        return response.status(500).json(error.message);
    }
}