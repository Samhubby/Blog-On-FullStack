import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { config } from "../utils/config.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const authCheck = async (req, res) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new ApiError(400, "Bad request: Access token missing");

    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    if (!decodedToken) throw new ApiError(401, "Invalid access token");

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) throw new ApiError(401, "Invalid access token");

    return res
      .status(200)
      .json(new ApiResponse(200, "Authentication successful", user));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(
        new ApiError(error.status, error?.message || "Invalid access token")
      );
  }
};

export { authCheck };
