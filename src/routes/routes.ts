import express from "express";
import { signup, login } from "../controllers/authController";
import { getIngredients } from "../controllers/ingredientController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

// Auth Routes
router.post("/auth/signup", signup);
router.post("/auth/login", login);

// Ingredient Routes (Ensure correct path)
router.get("/user/ingredients", authenticateUser, getIngredients);
// router.post("/user/ingredients/create", authenticateUser, addIngredient);
// router.delete("/user/ingredients/delete", authenticateUser, deleteIngredient);

export default router;
