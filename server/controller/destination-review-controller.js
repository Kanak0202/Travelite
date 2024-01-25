import Destination from "../models/DestinationReview.js";

export const add = async (request, response) => {
    try {
        const destination = new Destination(request.body);
        const currentdate = new Date();
        
        const newReview = {
            ...destination._doc, // Use _doc to get the raw document object
            dateCreated: currentdate
        };
        const savedReview = await Destination.create(newReview);
        
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

