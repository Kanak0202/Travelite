import express from "express";

//controllers
import { signup, login } from "../controller/auth-controller.js";
import { add, getUniquePlaces,searchPlace, placeReviews, singleReview, likeDislikeReview, updateReview } from "../controller/destination-review-controller.js";
import { viewCountIncrease, mostViewed } from "../controller/place-controller.js";
import { getUser, topUserReviews, deleteReview } from "../controller/user-info-controller.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.post("/add", add);
route.get("/explore", getUniquePlaces);
route.get("/search/:key", searchPlace);
route.get("/explore/:key", placeReviews);
route.get("/review/:key", singleReview);
route.patch("/like-review/:id", likeDislikeReview);
route.patch("/place/:name", viewCountIncrease);
route.get("/most-viewed-place", mostViewed);
route.get("/profile/:id", getUser);
route.get("/topUserReviews/:id", topUserReviews);
route.get("/my-uploads/:id", topUserReviews);
route.delete("/deleteReview", deleteReview);
route.put("/update-review/:id", updateReview);

export default route;