// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (req.isAuthenticated()) {
      return next();
    }

    return reject(res.status(401).json({ message: "Unauthorized" }));
  });
};
