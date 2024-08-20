import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";

export const app = express();
const corsOptions = {
  credentials: true,
  origin: config.BASE_URL,
};


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(cors(corsOptions));

import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import commentRouter from "./routes/comment.routes.js";
import authRouter from "./routes/auth.routes.js";
import { config } from "./utils/config.js";

app.use("/api", userRouter);
app.use("/api", blogRouter);
app.use("/api", commentRouter);
app.use("/api", authRouter);
app.use(express.static("dist"));
