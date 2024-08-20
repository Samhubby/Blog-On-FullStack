import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { config } from "../utils/config.js";
import { User } from "../models/user.model.js";

const authValidation = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new ApiError(400, "Bad request: Access token missing");
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    if (!decodedToken) throw new ApiError(401, "Invalid access token");

    const user = await User.findById(decodedToken._id);
    if (!user) throw new ApiError(401, "Invalid access token");

    req.user = user;
    next();
  } catch (error) {
    return res.json(
      new ApiError(401, error?.message || "Invalid access token")
    );
  }
};

export default authValidation;
