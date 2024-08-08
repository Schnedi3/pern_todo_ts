import { Request, Response, NextFunction } from "express";

export const validateSchema =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json(err.errors.map((err: any) => err.message));
    }
  };
