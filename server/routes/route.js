import express from "express";

//controllers
import { signup, login } from "../controller/auth-controller.js";
import { add, getUniquePlaces } from "../controller/destination-review-controller.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.post("/add", add);
route.get("/explore", getUniquePlaces);

export default route;