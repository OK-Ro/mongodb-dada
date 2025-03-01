require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDb connected succesfully");
  })
  .catch(() => {
    console.error("MongoDB connection error");
  });

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/transaction", transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Runnig on port ${PORT}`);
});
