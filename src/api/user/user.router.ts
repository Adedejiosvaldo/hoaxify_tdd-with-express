import { Router } from "express";
import { CreateUserController } from "./user.controller";

const userRouter = Router();

userRouter.post("/signup", CreateUserController);

export default userRouter;
