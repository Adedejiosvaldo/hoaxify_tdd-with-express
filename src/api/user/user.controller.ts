import { Request, Response } from "express";
import prisma from "../../prisma";
import { createUserDTO } from "./user.validator";

const CreateUserController = async (req: Request, res: Response) => {
  try {
    const data: createUserDTO = req.body;

    // const user = await prisma.user.findUnique({
    //   where: {
    //     email: data.email,
    //   },
    // // });

    // if (user) {
    //   return res.status(400).json({
    //     data: {
    //       status: "failed",
    //       message: "A user with that email already exists",
    //     },
    //   });
    // }

    prisma.user
      .create({
        data: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      })
      .then((user) => {
        res.send({ message: "User created sucessfully" });
      });
    // res.send({ message: "User created sucessfully" });
  } catch (error) {}
};

export { CreateUserController };
