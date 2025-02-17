require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected sucessfull");
  })
  .catch((err) => {
    console.error("MongoDB connection failed. Error:", err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting server:", error);
  } else console.log(`Server is running on port ${PORT}`);
});
