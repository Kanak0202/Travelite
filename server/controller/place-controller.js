import Place from "../models/Place.js";
import { placeReviews } from "./destination-review-controller.js";

// Function to increment view count for a place
export const viewCountIncrease = async (request, response) => {
    try {
        const placeName = request.params.name;

        // Find the place by name and update its view count
        const result = await Place.findOneAndUpdate(
            { name: placeName },
            { $inc: { views: 1 } }, // Increment views by 1
            { new: true, upsert: true } // Return the updated document and create if not found
        );

        return response.status(200).json({ viewCount: result.views }); // Return updated views
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
};

// Function to get the most viewed places
export const mostViewed = async (request, response) => {
    try {
        const places = await Place.find().sort([['views', -1]]).limit(3);
        if (places.length === 0) { // Check for empty results
            return response.status(404).json({ msg: "Data not found" });
        }
        return response.status(200).json(places);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
};

// Function to calculate new average ratings
const calculateRating = (oldReviewCount, newSingleAverageRating, oldAverageRating) => {
    const sum = (oldReviewCount * oldAverageRating) + newSingleAverageRating;
    const newReviewCount = oldReviewCount + 1;
    let newAverage = sum / newReviewCount;
    return (Math.round(newAverage * 100) / 100).toFixed(2); // Round to 2 decimal places
};

// Function to update average ratings and review count
export const updateAverageRatingandReviewCount = async (place, newSingleAverageRating, newWomenSafetyRating, newAccommodationRating, newCuisineRating, newTransportationRating, newCleanlinessRating, newValueForMoneyRating, newVegOptionsRating) => {
    const placeFound = await Place.findOne({ name: place });
    
    if (placeFound) {
        // Calculate new averages for each rating
        const oldReviewCount = placeFound.totalReviews;
        const oldAverageRating = placeFound.averageRating;
        const newAverageRating = calculateRating(oldReviewCount, newSingleAverageRating, oldAverageRating);
        const newAverageWomenSafetyRating = calculateRating(oldReviewCount, newWomenSafetyRating, placeFound.averageWomenSafety);
        const newAverageAccommodationRating = calculateRating(oldReviewCount, newAccommodationRating, placeFound.averageAccommodationRating);
        const newAverageCuisineRating = calculateRating(oldReviewCount, newCuisineRating, placeFound.averageCuisineRating);
        const newAverageTransportationRating = calculateRating(oldReviewCount, newTransportationRating, placeFound.averageTransportationRating);
        const newAverageCleanlinessRating = calculateRating(oldReviewCount, newCleanlinessRating, placeFound.averageCleanlinessRating);
        const newAverageValueForMoneyRating = calculateRating(oldReviewCount, newValueForMoneyRating, placeFound.averageValueForMoneyRating);
        const newAverageVegOptionsRating = calculateRating(oldReviewCount, newVegOptionsRating, placeFound.averageVegFoodAvailabilityRating);

        // Update the place with new ratings and review count
        const newReviewCount = oldReviewCount + 1;
        await Place.updateOne({ name: place }, {
            totalReviews: newReviewCount,
            averageRating: newAverageRating,
            averageWomenSafety: newAverageWomenSafetyRating,
            averageAccommodationRating: newAverageAccommodationRating,
            averageCuisineRating: newAverageCuisineRating,
            averageTransportationRating: newAverageTransportationRating,
            averageCleanlinessRating: newAverageCleanlinessRating,
            averageValueForMoneyRating: newAverageValueForMoneyRating,
            averageVegFoodAvailabilityRating: newAverageVegOptionsRating
        });
    } else {
        console.log("Place not found");
        const newPlace = {
            name: place,
            totalViews: 0,
            totalReviews: 1,
            averageRating: newSingleAverageRating,
            averageWomenSafety: newWomenSafetyRating,
            averageAccommodationRating: newAccommodationRating,
            averageCuisineRating: newCuisineRating,
            averageTransportationRating: newTransportationRating,
            averageCleanlinessRating: newCleanlinessRating,
            averageValueForMoneyRating: newValueForMoneyRating,
            averageVegFoodAvailabilityRating: newVegOptionsRating
        };
        const savedPlace = await Place.create(newPlace);
        return { success: true, savedPlace }; // Return success status and savedPlace
    }
};

// Function to get top-rated places
export const topRatedPlaces = async (request, response) => {
    try {
        const places = await Place.find().sort([['averageRating', -1]]).limit(3);
        if (places.length === 0) { // Check for empty results
            return response.status(404).json({ msg: "Data not found" });
        }
        return response.status(200).json(places);
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
};

// Function to get average ratings for a place
export const getAverageRating = async (request, response) => {
    try {
        const { place } = request.body;
        const placeData = await Place.findOne({ name: place });
        if (!placeData) {
            return response.status(400).json({ msg: "Place not found" });
        }
        
        const {
            averageVegFoodAvailabilityRating,
            averageAccommodationRating,
            averageCleanlinessRating,
            averageCuisineRating,
            averageTransportationRating,
            averageValueForMoneyRating,
            averageWomenSafety
        } = placeData;

        const ratings = {
            averageVegFoodAvailabilityRating,
            averageAccommodationRating,
            averageCleanlinessRating,
            averageCuisineRating,
            averageTransportationRating,
            averageValueForMoneyRating,
            averageWomenSafety
        };

        return response.status(200).json(ratings);
    } catch (error) {
        return response.status(500).json({ error: error.message, msg: "Could not get average ratings" });
    }
};
