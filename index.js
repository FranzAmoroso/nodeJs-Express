import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import dotenv from "dotenv";

import usersRoutes from "./routes/users.js";

const app = express();
// dotenv.config()

const PORT = process.env.PORT || 3000;
const CONNECTION_URL = 'mongodb://mongodb:27017/nodeJSTestAPI'

app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  console.log("Chiamata alla homepage");

  res.send("Benvenuto alla homepage");
});

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server rinning on port: ${PORT}`);
      });
  })
  .catch((error) => console.error(error));

