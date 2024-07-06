import path from "path";
import dotenv from "dotenv";
import { dbConnect } from "./db/index.js";
import { server, app } from "./socket/socket.js";

dotenv.config();
const port = process.env.PORT || 5500;

// ALL ROUTES DECLARED HERE
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import allUserRouter from "./routes/allUsers.routes.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";

const __dirname = path.resolve();

app.use(cors({ origin: process.env.CORS_ORIGIN, credential: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/allusers", allUserRouter);
app.use(errorHandler);
app.use(express.static(path.join(__dirname, "/frontend/dist"))); // serve static files to the server

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// connectDb returns a promise so using then method we execute and run our application
dbConnect()
  .then(() => {
    app.on("error", (err) => {
      console.log("something went wrong", err);
    });
    server.listen(port, () => {
      console.log(`My app running on port number ${port}`);
    });
  })
  .catch((err) => console.log("connection failed", err));
