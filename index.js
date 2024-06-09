import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import {authenticateToken} from './middlewares/auth.js';

const app = express();
dotenv.config()

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/users", authenticateToken, usersRoutes);
app.use("/auth" , authRoutes)

app.get("/", (req, res) => {
  console.log("Chiamata alla homepage");

  res.send("Benvenuto alla homepage");
});

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server rinning on port: ${PORT}`);
      });
  })
  .catch((error) => console.error(error));

