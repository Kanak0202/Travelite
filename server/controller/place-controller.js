import Place from "../models/Place.js";

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
