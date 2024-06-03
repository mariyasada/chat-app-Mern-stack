import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app } from "./socket/socket.js";

// export const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credential: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import allUserRouter from "./routes/allUsers.routes.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/allusers", allUserRouter);

app.use(errorHandler);
