import jwt from "jsonwebtoken";
import User from "../models/User.js"

export const verifyJwtToken = async(request, response, next)=>{    
    try{
        const token = request.cookies?.accessToken || request.header("Authorization")?.replace("Bearer ", "");
        
        if(!token){
            return response.status(401).json({error:"Unauthorized request"});
        }
        
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRETKEY);
        
        const user = await User.findById(decoded?._id).select("-password -refreshToken");
        
        if(!user){
            return response.status(400).json({msg: "User not found"});
        }

        request.user = user;
        next();
    }catch(error){
        return response.status(500).json({error:error.message, msg:"token expired"});
    }
}