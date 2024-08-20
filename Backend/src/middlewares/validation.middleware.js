import { body, validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const validateEmail = body("email")
  .trim()
  .escape()
  .not()
  .isEmpty()
  .withMessage("Email is required")
  .bail()
  .isEmail()
  .withMessage("Invalid email address");
const validateFullName = body("fullName")
  .trim()
  .escape()
  .not()
  .isEmpty()
  .withMessage("Username is required")
  .bail()
  .matches(/^[a-zA-Z0-9\s.,'-]+$/)
  .withMessage("Username must contain only letters");
const validatePassword = body("password")
  .trim()
  .escape()
  .not()
  .isEmpty()
  .withMessage("Password is required")
  .bail()
  .isAlphanumeric()
  .withMessage("Password must be alphanumeric")
  .isLength({ min: 6 })
  .withMessage("Password should contain minimum 6 characters");

const validateTitle = body("title")
  .trim()
  .escape()
  .not()
  .isEmpty()
  .withMessage("Title is required")
  .bail()
  .matches(/^[A-Za-z0-9\s,:;'"!?()]+$/)
  .withMessage("Invalid Title format");

const validateDescription = body("description")
  .trim()
  .escape()
  .isString()
  .withMessage("Invalid Description format");

const validationResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.json(new ApiError(400, "Invalid Input", errorMessages));
  }
  next();
};

const sanitizeForRegister = [
  validateEmail,
  validateFullName,
  validatePassword,
  validationResults,
];
const sanitizeForLogin = [validateEmail, validatePassword, validationResults];
const sanitizeForBlog = [validateTitle, validateDescription, validationResults];

export { sanitizeForRegister, sanitizeForLogin, sanitizeForBlog };
