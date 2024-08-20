import "dotenv/config.js";

export const config = {
  PORT: String(process.env.PORT),
  MONGODB_URL: String(process.env.MONGODB_URL),
  JWT_SECRET: String(process.env.JWT_SECRET),
  ACCESS_TOKEN_EXPIRY: String(process.env.ACCESS_TOKEN_EXPIRY),
  REFRESH_TOKEN_EXPIRY: String(process.env.REFRESH_TOKEN_EXPIRY),
  CLOUDINARY_CLOUD_NAME: String(process.env.CLOUDINARY_CLOUD_NAME),
  CLOUDINARY_API_KEY: String(process.env.CLOUDINARY_API_KEY),
  CLOUDINARY_API_SECRET: String(process.env.CLOUDINARY_API_SECRET),
  BASE_URL:String(process.env.BASE_URL)
};
