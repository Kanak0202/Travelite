import User from "../models/User.js";
import Destination from "../models/DestinationReview.js";

export const topUserReviews = async (request, response) => {
    try {
        const type = request.query.type;
        let result;
        if (type === "topReviews") {
            result = await Destination.find({ userId: request.params.id }).populate("userId", "name").sort([['likeCount', -1]]);
        } else if (type === "uploads") {
            result = await Destination.find({ userId: request.params.id }).populate("userId", "name").sort([['dateCreated', 1]]);
        }

        if (!result) {
            return response.status(404).json({ msg: "Can't find data to retrieve" });
        }

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json(error.message);
    }
};


export const getUser = async(request, response)=>{
    try{
        let userId = request.params.id;
        let result = await User.find({_id:userId});
        if(!result){
            return response.status(404).json({msg: "Data not found"});
        }
        return response.status(200).json(result);
    }catch(error){
        return response.status(500).json({msg: error.message});
    }
}

export const deleteReview = async(request, response)=>{
    try{
        const id = request.body.id;
        let result = await Destination.deleteOne({ _id: id });
        if(!result){
            return response.status(404).json({msg: "Data not found"});
        }
        return response.status(200).json({msg:"Review deleted successfully"});
    }catch(error){
        return response.status(500).json({msg: error.message});
    }
}