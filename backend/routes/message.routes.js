import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.route("/sendmessage/:id").post(verifyJWT, sendMessage);
router.route("/getmessage/:id").get(verifyJWT, getMessage);

export default router;
