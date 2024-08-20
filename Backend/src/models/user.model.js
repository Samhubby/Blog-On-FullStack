import mongoose, { Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../utils/config.js";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: [true, "Password is required"],
  },
  avatar: {
    type: String,
    default:
      "http://res.cloudinary.com/dbtn8ikgy/image/upload/v1723099741/ohediwzwphgwvxejqfi4.png",
  },
  refreshToken: {
    type: String,
  },
  
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      avatar: this.avatar,
    },
    config.JWT_SECRET,
    { expiresIn: config.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    config.JWT_SECRET,
    { expiresIn: config.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema, "users");
