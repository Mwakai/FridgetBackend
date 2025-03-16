import { Request, Response } from "express";
import Ingredient from "../models/ingredient";

interface AuthenticatedRequest extends Request {
  user?: { id: string; userId: string };
}

export const getIngredients = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }

    const userId = req.user.id;
    console.log(`Fetching ingredients for user: ${userId}`);

    const ingredients = await Ingredient.find({ userId });

    res.status(200).json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
