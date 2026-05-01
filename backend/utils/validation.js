import { body } from "express-validator";

export const registerValidation = [
  body("name").notEmpty().withMessage("Name is required").trim(),
  body("email")
    .isEmail()
    .withMessage("Please include a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage(
      "Password must contain at least one special character (@$!%*?&)",
    ),
];

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please include a valid email")
    .normalizeEmail(),
  body("password").exists().withMessage("Password is required"),
];

export const changePasswordValidation = [
  body("oldPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("New password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("New password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("New password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage(
      "New password must contain at least one special character (@$!%*?&)",
    ),
];

export const noteValidation = [
  body("title").notEmpty().withMessage("Title is required").trim(),
  body("content").notEmpty().withMessage("Content is required"),
  body("tags").optional().isArray().withMessage("Tags must be an array"),
  body("isPinned")
    .optional()
    .isBoolean()
    .withMessage("isPinned must be a boolean"),
];
