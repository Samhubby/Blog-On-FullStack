import { v2 as cloudinary } from "cloudinary";
import { config } from "./config.js";
import { ApiError } from "./ApiError.js";
import fs from "fs";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      transformation: [
        { width: 800, height: 600, crop: "limit" },
        { quality: "auto:good" },
        { fetch_format: "auto" },
      ],
    });
    if (!response) throw new ApiError(500, "Failed to upload avatar");
    fs.unlinkSync(localFilePath);
    
    return response;
  } catch (error) {
    return res
      .status(error.status)
      .json(new ApiError(error.status, error.message));
  }
};
