import express from "express";
import connectDB from "./config/db.js";
import router from "./route/route.js";
import dotenv from "dotenv";
import cors from "cors";

// ✅ Load environment variables first
dotenv.config();
const app = express();

// ✅ Connect to MongoDB after .env is loaded
connectDB();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", router);

// Root Route
app.get("/", (req, res) => {
  res.send("<h1>Hello..........</h1>");
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});