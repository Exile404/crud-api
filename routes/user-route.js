import express from "express";
import { deleteUser, getUser, updateUser, createUser, getAllUsers } from "../controllers/user-controller.js";


const router = express.Router();

router.post("/create", createUser)
router.get("/", getAllUsers)
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:id",updateUser)

export default router;