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
