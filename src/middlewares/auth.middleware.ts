import express from "express";
import { verifyIn } from "../utils/jwt";

export const authMiddle = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let token: string | undefined;

    // Check Authorization header first
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
    // If no token in auth header, check cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const verify = verifyIn(token) as any;
    if (!verify) {
      return res.status(401).json({ message: "Token verification failed" });
    }

    // Properly set user ID on request object
    //@ts-ignore
    req.id = verify.user_id;
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};
