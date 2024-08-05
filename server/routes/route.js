import express from "express";

//controllers
import { signup, login } from "../controller/auth-controller.js";
import { add, getUniquePlaces,searchPlace, placeReviews, singleReview, likeDislikeReview, updateReview } from "../controller/destination-review-controller.js";
import { viewCountIncrease, mostViewed, topRatedPlaces, getAverageRating } from "../controller/place-controller.js";
import { getUser, topUserReviews, deleteReview } from "../controller/user-info-controller.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.post("/add", add); //adding destination
route.get("/explore", getUniquePlaces);
route.get("/search/:key", searchPlace);
route.get("/explore/:key", placeReviews);
route.get("/review/:key", singleReview);
route.patch("/like-review/:id", likeDislikeReview);
route.patch("/place/:name", viewCountIncrease);
route.get("/most-viewed-place", mostViewed);
route.get("/top-rated-places", topRatedPlaces);
route.get("/profile/:id", getUser);
route.get("/topUserReviews/:id", topUserReviews);
route.get("/my-uploads/:id", topUserReviews);
route.delete("/deleteReview", deleteReview);
route.put("/update-review/:id", updateReview);
route.post("/place/averageRating", getAverageRating);

export default route;