import express from "express";
import taskController from "./controller/task.controller.js";

const taskRoute = express();

// instance of cart controller
let controller = new taskController();

//setting up route for cart

taskRoute.get("/", (req, res) => {
  controller.getTasks(req, res);
});

taskRoute.post("/", (req, res) => {
  controller.addTask(req, res);
});


taskRoute.put("/update/", (req, res) => {
  controller.updateTask(req, res);
});

taskRoute.delete("/delete/", (req, res) => {
  controller.deleteTask(req, res);
});
export default taskRoute;
