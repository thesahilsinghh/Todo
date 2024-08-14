import app from "./index.js";
import connectToDb from "./src/config/connectToMySql.js";
app.listen("3100", () => {
  console.log("Server listens to 3100!");
});
