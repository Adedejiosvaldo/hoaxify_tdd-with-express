import { z } from "zod";
import validateRequest from "../../utils/validator";

type LoginUserDTO = z.infer<typeof loginSchema>;
type createUserDTO = z.infer<typeof createUserSchema>;

const loginSchema = z.object({
  email: z.string().email({ message: "Kindly enter a valid password" }),
  password: z.string().min(4, "Password lenght is greate than 4"),
});

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  });

const createUserSchema = z.object({
  email: z.string().email({ message: "Kindly enter a valid password" }),
  password: z.string().min(4, "Password lenght is greate than 4"),
  username: z.string(),
});

export { LoginUserDTO, createUserDTO };

export const loginValidator = validateRequest(loginSchema, "body");
export const CreateUserValidator = validateRequest(createUserSchema, "body");
