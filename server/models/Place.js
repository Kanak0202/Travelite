import mongoose from "mongoose";

const placeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    totalReviews:{
        type:Number
    },
    views:{
        type:Number,
        required:true,
        default:0
    }, 
    averageRating:{
        type:Number,
    },
    averageWomenSafety:{
        type:Number,
    },
    averageAccommodationRating:{
        type:Number,
    },
    averageTransportationRating:{
        type:Number,
    },
    averageCuisineRating:{
        type:Number,
    },
    averageCleanlinessRating:{
        type:Number,
    },
    averageVegFoodAvailabilityRating:{
        type:Number,
    },
    averageValueForMoneyRating:{
        type:Number,
    },
})

const place = mongoose.model("Place", placeSchema);

export default place;