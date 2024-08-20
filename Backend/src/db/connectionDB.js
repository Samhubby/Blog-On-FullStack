import mongoose from "mongoose";
import { config } from "../utils/config.js";
import { ApiError } from "../utils/ApiError.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(config.MONGODB_URL);
    console.log(
      `MongoDB Connected ! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(new ApiError(error.status, error.message));
    process.exit(1);
  }
};
