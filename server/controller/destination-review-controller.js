import Destination from "../models/DestinationReview.js";

export const add = async (request, response) => {
    try {
        const destination = new Destination(request.body);
        const currentdate = new Date();
        const datetime =
            currentdate.getDate() +
            "/" +
            (currentdate.getMonth() + 1) +
            "/" +
            currentdate.getFullYear() +
            " @ " +
            currentdate.getHours() +
            ":" +
            currentdate.getMinutes() +
            ":" +
            currentdate.getSeconds();

        // Create a new object with the updated properties
        const newReview = {
            ...destination._doc, // Use _doc to get the raw document object
            dateCreated: datetime
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
        console.log(result);
    if(!result){
        return response.status(404).json({msg:"Can't find data to retrieve"});
    }
    return response.status(200).json(result);
    }catch(error){
        return response.status(500).json(error.message);
    }
}