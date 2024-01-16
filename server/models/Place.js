import mongoose from "mongoose";

const placeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        required:true,
        default:0
    }
})

const place = mongoose.model("Place", placeSchema);

export default place;