import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors"; // Import the colors package for colored console output

dotenv.config(); // Load environment variables from .env file

// connect to MongoDB
const connectDB = async () => {
  try {
    console.log("mongodb uri:", process.env.MONGODB_URI); // Log the MongoDB URI for debugging
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.blue);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
