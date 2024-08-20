import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { options } from "../utils/options.js";

const generateAccessAndRefreshToken = async (userID) => {
  const user = await User.findById(userID);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists)
      throw new ApiError(409, "User already exists with this email");

    const localFilePath = req.file?.path;

    const avatar = await uploadOnCloudinary(localFilePath);

    const user = await User.create({
      email,
      fullName,
      password,
      avatar: avatar?.url,
    });

    if (!user) throw new ApiError(500, "Failed to create User");

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user.id.toString()
    );

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;
    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(201, "User Registered Successfully", userResponse));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(error.status, error.message));
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new ApiError(401, "Invalid email or password");

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) throw new ApiError(401, "Invalid email or password");

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;
    return res
      .status(200)
      .cookie("accessToken", accessToken,options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, "User logged in successfully", userResponse));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(error.status, error.message));
  }
};

const logOut = async (_, res) => {
  try {
    return res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, "User Logged out successfully"));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(500, "Failed to logout user"));
  }
};

const updateFullName = async (req, res) => {
  try {
    const { newFullName } = req.body;

    const id = req.user.id;
    const user = await User.findById(id).select("-password -refreshToken");

    if (newFullName === user.fullName) {
      throw new ApiError(401, "No any changes made");
    }
    if (!user) throw new ApiError(401, "User not found");

    user.fullName = newFullName;
    await user.save({ validateBeforeSave: false });

    const newUser = await User.findById(id).select("-password -refreshToken");
    return res
      .status(200)
      .json(new ApiResponse(200, "Full Name updated successfully", newUser));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(error.status, error.message));
  }
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const id = req.user.id;
    const user = await User.findById(id);
    const isPasswordValid = await user.isPasswordCorrect(currentPassword);

    if (!isPasswordValid) throw new ApiError(404, "Invalid current password");

    user.password = newPassword;
    await user.save();
    return res
      .status(200)
      .json(new ApiResponse(200, "Password updated successfully"));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(error.status, error.message));
  }
};

const updateAvatar = async (req, res) => {
  try {
    const localFilePath = req.file.path;
    const id = req.user.id;
    if (!localFilePath) throw new ApiError(500, "Failed to update avatar");
    const newAvatar = await uploadOnCloudinary(localFilePath);

    const user = await User.findById(id);

    user.avatar = newAvatar.url;
    await user.save({ validateBeforeSave: false });

    const updatedUser = await User.findById(id).select(
      "-password -refreshToken"
    );
    return res
      .status(200)
      .json(new ApiResponse(200, "Avatar updated successfully", updatedUser));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(error.status, error.message));
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken ||
      req.header("Authorization").replace("Bearer ", "");

    if (!incomingRefreshToken)
      throw new ApiError(401, "Bad request: Refresh Token Missing");

    const decodedToken = jwt.verify(incomingRefreshToken, config.JWT_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) throw new ApiError(401, "Invalid Refresh Token");

    if (incomingRefreshToken !== user.refreshToken)
      throw new ApiError(401, "Refresh token is expired or used");

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,

          "Access token refreshed"
        )
      );
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(error.status, error.message));
  }
};

export {
  registerUser,
  loginUser,
  logOut,
  updateFullName,
  updatePassword,
  updateAvatar,
  refreshAccessToken,
};
