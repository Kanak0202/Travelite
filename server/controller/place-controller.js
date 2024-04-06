import Place from "../models/Place.js";
import { placeReviews } from "./destination-review-controller.js";

export const viewCountIncrease = async (request, response) => {
  try {
    const placeName = request.params.name;

    // Find the place by name and update its viewCount
    const result = await Place.findOneAndUpdate(
      { name: placeName },
      { $inc: { views: 1 } }, // Increment viewCount by 1
      { new: true, upsert: true } // Return the updated document and create if not found
    );

    return response.status(200).json({ viewCount: result.viewCount });
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const mostViewed = async(request, response)=>{
    try {
        const places = await Place.find().sort([['views', -1]]).limit(3);
        if(!places){
            return response.status(404).json({msg: "Data not found"});
        }
        return response.status(200).json(places);
      } catch (error) {
        return response.status(500).json({ msg: error.message });
      }
}

//function
const calculateRating = (oldReviewCount, newSingleAverageRating, oldAverageRating)=>{
    const sum = (oldReviewCount*oldAverageRating) + newSingleAverageRating;
    const newReviewCount = oldReviewCount+1;
    let newAverage = sum/newReviewCount;
    newAverage = (Math.round(newAverage * 100) / 100).toFixed(2);
    return newAverage;
}

export const updateAverageRatingandReviewCount = async (place, newSingleAverageRating, newWomenSafetyRating, newAccomodationRating, newCuisineRating, newTransportationRating, newCleanlinessRating, newValueForMoneyRating, newVegOptionsRating)=>{
  const placeFound = await Place.findOne({name:place});
  if(placeFound){
    //for average rating
    const oldReviewCount = placeFound.totalReviews;
    const oldAverageRating = placeFound.averageRating;
    const newAverageRating = calculateRating(oldReviewCount, newSingleAverageRating, oldAverageRating);
    const newAverageWomenSafetyRating = calculateRating(oldReviewCount, newWomenSafetyRating, placeFound.averageWomenSafety);
    const newAverageAccommodationRating = calculateRating(oldReviewCount, newAccomodationRating, placeFound.averageAccommodationRating);
    const newAverageCuisineRating = calculateRating(oldReviewCount, newCuisineRating, placeFound.averageCuisineRating);
    const newAverageTransportationRating = calculateRating(oldReviewCount, newTransportationRating, placeFound.averageTransportationRating);
    const newAverageCleanlinessRating = calculateRating(oldReviewCount, newCleanlinessRating, placeFound.averageCleanlinessRating);
    const newAverageValueForMoneyRating = calculateRating(oldReviewCount, newValueForMoneyRating, placeFound.averageValueForMoneyRating);
    const newAverageVegOptionsRating = calculateRating(oldReviewCount, newVegOptionsRating, placeFound.averageVegFoodAvailabilityRating);
    const newReviewCount = oldReviewCount+1;
    await Place.updateOne({name:place}, {totalReviews:newReviewCount, averageRating:newAverageRating, averageWomenSafety:newAverageWomenSafetyRating, averageAccommodationRating:newAverageAccommodationRating, averageCuisineRating:newAverageCuisineRating, averageTransportationRating:newAverageTransportationRating, averageCleanlinessRating:newAverageCleanlinessRating, averageValueForMoneyRating:newAverageValueForMoneyRating, averageVegFoodAvailabilityRating:newAverageVegOptionsRating});
  }else{
    console.log("Place not found");
    const newPlace = {
      name:place,
      totalViews:0,
      totalReviews:1,
      averageRating:newSingleAverageRating,
      averageWomenSafety:newWomenSafetyRating,
      averageAccommodationRating:newAccomodationRating, 
      averageCuisineRating:newCuisineRating, 
      averageTransportationRating:newTransportationRating, 
      averageCleanlinessRating:newCleanlinessRating, 
      averageValueForMoneyRating:newValueForMoneyRating, 
      averageVegFoodAvailabilityRating:newVegOptionsRating
    }
    console.log(newPlace);
    const savedPlace = await Place.create(newPlace);
    console.log("savedPlace");
  }
}

export const topRatedPlaces = async(request, response)=>{
  try {
      const places = await Place.find().sort([['averageRating', -1]]).limit(3);
      if(!places){
          return response.status(404).json({msg: "Data not found"});
      }
      return response.status(200).json(places);
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
}
