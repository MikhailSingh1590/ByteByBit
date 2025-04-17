require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const emailRoutes = require("./routes/emailRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");


const app = express();
app.use(express.json());
app.use(cors());

// Use email routes for the /api/email endpoint
app.use("/api/email", emailRoutes);

app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection failed:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
