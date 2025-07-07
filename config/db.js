import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anbuvel24072003:eS6mvcOn00Qk9Pod@accrix.wwexwhg.mongodb.net/lead-api?retryWrites=true&w=majority&appName=accrix"
    );
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ DB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;