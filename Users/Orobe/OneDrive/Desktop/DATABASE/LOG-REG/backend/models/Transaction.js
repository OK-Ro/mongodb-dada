const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: string, enum: ["InStock", "outstock"], required: true },
    quantity: { type: number, required: true },
    reference: { type: String, default: "" },
    date: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trasaction", TransactionSchema);
