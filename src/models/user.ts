import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    userId: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    veganOptions: { type: Boolean, default: false },
    allergies: { type: [String], default: [] },
    meatConsumption: {
      type: String,
      enum: ["None", "Low", "Moderate", "High"],
      required: true,
    },
    fishConsumption: {
      type: String,
      enum: ["None", "Low", "Moderate", "High"],
      required: true,
    },
    vegetableConsumption: {
      type: String,
      enum: ["None", "Low", "Moderate", "High"],
      required: true,
    },
    spiciness: {
      type: String,
      enum: ["None", "Mild", "Medium", "Spicy"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
