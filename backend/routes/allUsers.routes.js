import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controllers/allUsers.controller.js";

const router = Router();

router.route("/").get(verifyJWT, getAllUsers);

export default router;
