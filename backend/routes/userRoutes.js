import express from "express";
import { getPublishedCreations, getUserCreations, toggleLikeCreation } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const UserRoutes = express.Router();

UserRoutes.get("/get-user-creations", auth, getUserCreations);
UserRoutes.get("/get-published-creations", auth, getPublishedCreations);
UserRoutes.post("/toggle-like-creation", auth, toggleLikeCreation)


export default UserRoutes;