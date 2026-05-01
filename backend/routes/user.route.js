import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import * as validation from "../utils/validation.js";

const router = Router();

router.post(
  "/register",
  validation.registerValidation,
  userController.registerUser,
);
router.post("/login", validation.loginValidation, userController.loginUser);
router.post(
  "/change-password",
  protect,
  validation.changePasswordValidation,
  userController.changePassword,
);
router.put("/edit-user", protect, userController.editUser);

export default router;
