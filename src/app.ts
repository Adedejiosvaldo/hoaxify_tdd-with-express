import express, { Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import * as middlewares from "./middlewares";
import MessageResponse from "./interfaces/MessageResponse";
import userRouter from "./api/user/user.router";

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api/v1/user", userRouter);
// app.post("/api/v1/user", (req: Request, res: Response) => {
//   res.send({
//     message: "User created sucessfully",
//   });
// });

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
