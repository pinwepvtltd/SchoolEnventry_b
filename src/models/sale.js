import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    fatherName: { type: String, required: true },
    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        quantity: Number,
        sellingPrice: Number,
        total: Number,
      },
    ],
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "check", "upi"],
      default: "cash",
    },
    billNumber: { type: String, unique: true },
    status: {
      type: String,
      enum: ["completed", "pending", "cancelled"],
      default: "completed",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Sale", saleSchema);
