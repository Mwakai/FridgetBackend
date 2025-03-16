import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface AuthenticatedRequest extends Request {
  user?: { id: string; userId: string };
}

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      userId: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};
