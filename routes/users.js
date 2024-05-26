import express from "express";
import {
  readAllUser,
  createUser,
  readUserByID,
  updateUser,
  deleteUser,
} from "../controller/users.js";

const router = express.Router();

router.get("/", readAllUser);

router.post("/", createUser);

router.get("/:id", readUserByID);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
