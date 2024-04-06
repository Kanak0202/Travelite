import Destination from "../models/DestinationReview.js";

import { updateAverageRatingandReviewCount } from "./place-controller.js";
import { updateUserRewardPoints } from "./user-info-controller.js";

export const add = async (request, response) => {
    console.log("Inside add controller");
    try {
        const destination = new Destination(request.body);
        const currentdate = new Date();

        const reviewAnalysis = {
            review:destination.detailedReview
        }

        const sentimentResponse = await fetch("http://127.0.0.1:5000/", {
            method:"POST",
            body: JSON.stringify(reviewAnalysis),
            headers: {
              'Content-Type': 'application/json',
            }
        });
        let sentiment = "";
        if(sentimentResponse){
            const data = await sentimentResponse.json();
            console.log(data);
            sentiment = data.sentiment;
        }else{
            return response.status(500).json(err.message);
        }
              
        const newReview = {
            ...destination._doc, // Use _doc to get the raw document object
            dateCreated: currentdate,
            sentiment: sentiment
        };

        const savedReview = await Destination.create(newReview);
        updateUserRewardPoints('newReview',newReview.userId)
        updateAverageRatingandReviewCount(savedReview.place, savedReview.averageRating, savedReview.safetyOfWomen, savedReview.accommodation, savedReview.cuisine, savedReview.transportation, savedReview.cleanliness, savedReview.money, savedReview.veg);
        
        return response.status(200).json(newReview);
    } catch (err) {
        return response.status(500).json(err.message);
    }
};


export const getUniquePlaces = async(request, response)=>{
    try{
        const places = await Destination.find({},'place').distinct('place');
        if(!places){
            return response.status(404).json({msg:"No places to show"});
        }
        return response.status(200).json(places);
    }catch(error){
        return response.status(500).json(error.message);
    }
}

export const searchPlace = async(request, response)=>{
    try{
        let result = await Destination.find({
            "$or":[
                {place:{$regex:request.params.key, $options:'i'}},
                {city:{$regex:request.params.key, $options:'i'}},
                {state:{$regex:request.params.key, $options:'i'}},
                {country:{$regex:request.params.key, $options:'i'}}
            ]
        }).distinct('place');
        if(result){
            return response.status(200).json(result);
        }
        else{
            return response.status(404).json({msg:"Can't find data to retrieve"});
        }
    }catch(error){
        return response.status(500).json(error.message)
    }
} 

export const placeReviews = async(request, response)=>{
    try{
        let result = await Destination.find({place:request.params.key}).populate("userId", "name");
    if(!result){
        return response.status(404).json({msg:"Can't find data to retrieve"});
    }
    return response.status(200).json(result);
    }catch(error){
        return response.status(500).json(error.message);
    }
}

export const singleReview = async(request, response)=>{
    try{
        let result = await Destination.find({ _id: request.params.key }).populate("userId", ["name", "_id"]);
    if(!result){
        return response.status(404).json({msg:"Can't find data to retrieve"});
    }
    return response.status(200).json(result);
    }catch(error){
        return response.status(500).json(error.message);
    }
}

export const likeDislikeReview = async (request, response) => {
    try {
        const reviewId = request.params.id;
        const userId = request.body.userId;
        const filter = { _id: reviewId };
        let destination = await Destination.findById(reviewId);

        if (!destination) {
            return response.status(404).json({ msg: "Can't find data to retrieve" });
        }

        // Check if the userId is already in the likedBy array
        if (!destination.likedBy.includes(userId)) {
            destination.likedBy.push(userId);
        } else {
            destination.likedBy = destination.likedBy.filter(id => id !== userId);
        }

        const update = { likedBy: destination.likedBy, likeCount: destination.likedBy.length};
        let result = await Destination.findOneAndUpdate(filter, update, { new: true });
        if(result.likeCount>=10){
            updateUserRewardPoints('likeCount', result.userId);
        }
        return response.status(200).json({likeCount:result.likeCount, likedBy:result.likedBy});
    } catch (error) {
        return response.status(500).json(error.message);
    }
};

export const updateReview = async(request, response) =>{
    try{
        let result = await Destination.updateOne({_id:request.params.id}, {$set: request.body });
        if(!result){
            return response.status(404).json({msg:"Review not found and updated"});
        }
        return response.status(200).json({msg:"Review updated successfully"});
    }catch(error){
        return response.status(500).json(error.message);
    }
}

