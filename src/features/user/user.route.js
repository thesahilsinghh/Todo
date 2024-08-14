import express from "express";
import UserController from "./controller/user.contoller.js";
const userRoute = express.Router();

//instance of controller class
let userController = new UserController();

//route .../api/users
userRoute.post("/login", (req, res, next) => {
  userController.login(req, res, next);
});
userRoute.post("/signup", (req, res, next) => {
  userController.signUp(req, res, next);
});

export default userRoute;
