import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Create user
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      firstName,
      userId,
      password,
      veganOptions,
      allergies,
      meatConsumption,
      fishConsumption,
      vegetableConsumption,
      spiciness,
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      userId,
      password: hashedPassword,
      veganOptions,
      allergies,
      meatConsumption,
      fishConsumption,
      vegetableConsumption,
      spiciness,
    });

    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Login User
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ userId });
    if (!user) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id, userId: user.userId }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      token,
      userId: user.userId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
