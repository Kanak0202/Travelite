import express from "express";

//controllers
import { signup, login } from "../controller/auth-controller.js";
import { add, getUniquePlaces,searchPlace, placeReviews } from "../controller/destination-review-controller.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.post("/add", add);
route.get("/explore", getUniquePlaces);
route.get("/search/:key", searchPlace);
route.get("/explore/:key", placeReviews);

export default route;