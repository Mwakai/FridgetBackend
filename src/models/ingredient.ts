import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        "Vegetables",
        "Fruits",
        "Meat",
        "Seafood",
        "Dairy",
        "Grains",
        "Legumes",
        "Nuts & Seeds",
        "Herbs & Spices",
        "Oils & Fats",
        "Condiments",
        "Baking",
        "Beverages",
        "Canned Goods",
        "Frozen Foods",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

export default Ingredient;
