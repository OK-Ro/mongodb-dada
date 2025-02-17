require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`MongoDB connected sucefully and runing on port ${PORT}`);
  })
  .catch((error) => {
    console.error("MongoDB connection error", error);
  });

app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
  if (error) {
    console.error("Server problem:", error);
  } else {
    console.error(`Server Running On ${PORT}`);
  }
});
