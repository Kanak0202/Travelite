import express from "express";

//controllers
import { signup, login } from "../controller/auth-controller.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);

export default route;