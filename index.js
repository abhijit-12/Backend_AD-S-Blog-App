const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173", // Your front-end URL
    credentials: true,
  })
);
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies

// Route imports
const userRoutes = require("./routs/user.js");
const blogRoutes = require("./routs/blogroutes.js");

// API routes
app.use("/api/user", userRoutes);
app.use("/api/posts", blogRoutes);

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

main();

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
