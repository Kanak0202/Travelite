import mongoose from "mongoose";
import User from "./User.js";

const destinationSchema = mongoose.Schema({
    userId:{
        type: mongoose.ObjectId,
        ref: User,
        required:true
    },
    place:{
        type:String,
        required:true,
    },
    touristAttractions:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true
    }, 
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    budget:{
        type:Number,
        required:true
    },
    cleanliness:{
        type:Number,
        required:true
    },
    cuisine:{
        type:Number,
        required:true
    },
    money:{
        type:Number,
        required:true
    },
    veg:{
        type:Number,
        required:true
    },
    transportation:{
        type:Number,
        required:true
    },
    accommodation:{
        type:Number,
        required:true
    },
    safetyOfWomen:{
        type:Number,
        required:true
    },
    timePeriod:{
        type:String,
        required:true
    },
    daysRequired:{
      type:Number,
      required:true  
    },
    dateCreated:{
        type:Date, 
        required:true
    },
    briefDescription:{
        type:String,
        required:true
    },
    detailedReview:{
        type:String,
        required:true
    },
    likedBy:{
        type:[String],
        default:[]
    },
    likeCount:{
        type:Number,
        default:0
    },
    photoLink:{
        type:String,
        default:""
    }
});

const destination = mongoose.model('destination', destinationSchema);

export default destination;