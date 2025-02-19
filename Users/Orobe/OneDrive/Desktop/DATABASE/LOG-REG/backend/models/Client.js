const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    surName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["client"], default: "client" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", ClientSchema);
