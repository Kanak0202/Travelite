import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }, 
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    rewardPoints:{
        type:Number
    },
    refreshToken:{
        type:String,
        required: true
    }
});

userSchema.methods.generateAccessToken = function(){
    
    return jwt.sign({
        _id: this._id,
        email: this.email
    }, 
    process.env.JWT_ACCESS_SECRETKEY,
    {
        expiresIn: process.env.JWT_ACCESS_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    }, 
    process.env.JWT_REFRESH_SECRETKEY,
    {
        expiresIn: process.env.JWT_REFRESH_EXPIRY
    })
}


const user = mongoose.model('user', userSchema);

export default user;