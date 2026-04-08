import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["books", "uniform", "stationery", "dress", "copies", "other"],
      default: "books"
    },
    costPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    description: { type: String, default: "" },
    lowStockAlert: { type: Number, default: 5 },
    classLevel: {
      type: String,
      enum: ["", "nursery", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      default: "",
    },
    finalPrice: { type: Number }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);