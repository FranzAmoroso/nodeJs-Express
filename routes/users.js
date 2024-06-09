import express from "express";
import {
  readAllUser,
  insertUser,
  readUserByID,
  updateUser,
  deleteUser,
} from "../controller/users.js";


const router = express.Router();

router.get("/", readAllUser);

router.post("/", insertUser);

router.get("/:id", readUserByID);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
