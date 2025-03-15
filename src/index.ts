import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/Database";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Register Routes
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
