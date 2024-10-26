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
        required:true,
        default: 0
    },
    cleanliness:{
        type:Number,
        required:true,
        default: 0
    },
    cuisine:{
        type:Number,
        required:true,
        default: 0
    },
    money:{
        type:Number,
        required:true,
        default: 0
    },
    veg:{
        type:Number,
        required:true,
        default: 0
    },
    transportation:{
        type:Number,
        required:true,
        default: 0
    },
    accommodation:{
        type:Number,
        required:true,
        default: 0
    },
    safetyOfWomen:{
        type:Number,
        required:true,
        default: 0
    },
    averageRating:{
        type:Number,
        required:true,
        default: 0
    },
    timePeriod:{
        type:String,
        required:true
    },
    daysRequired:{
      type:Number,
      required:true,
      default: 0
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
    },
    sentiment:{
        type:String
    }
}, {timestamps: true});

const destination = mongoose.model('destination', destinationSchema);

export default destination;