import { Request, Response } from "express";

const CreateUserController = (req: Request, res: Response) => {
  res.send({ message: "User created sucessfully" });
};

export { CreateUserController };
