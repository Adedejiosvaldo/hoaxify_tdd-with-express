import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export default function validateRequest(
  schema: ZodSchema,
  requestPart: "body" | "query"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = requestPart === "body" ? req.body : req.query;
    const result = schema.safeParse(data, {});
    if (!result.success) {
      return res.status(400).json(result.error.format());
    }
    next();
  };
}
