import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.isAuthenticated()) {
    next(); // Pass control to the next middleware if authenticated
  } else {
    res.status(401).json({ message: "Unauthorized" }); // Send Unauthorized response
  }
};
