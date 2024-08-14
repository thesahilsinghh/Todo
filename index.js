import "./env.js";
import express from "express";
import userRoute from "./src/features/user/user.route.js";
import taskRoute from "./src/features/task/task.routes.js";
import jwtAuthenticate from "./src/middlewares/jwtAuth.js";
// import swagger from "swagger-ui-express";
// import apiDocs from "./swagger.json" assert { type: "json" };
import cors from "cors";

let app = express();
app.use(express.json());

app.use(cors());

//routing to be done
app.use("/api/user/", userRoute);
app.use("/api/tasks/", jwtAuthenticate, taskRoute);

// //documentation
// app.use("/api/api-docs/", swagger.serve, swagger.setup(apiDocs));

//if route is not valid
app.use("", (req, res) => {
  res.status(404).send("API not found. Please check your URL.");
});

export default app;
