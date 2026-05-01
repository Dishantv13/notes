import * as userService from "../services/user.services.js";
import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.js";
import { USER_MESSAGES, VALIDATION_MESSAGE } from "../utils/successMessage.js";
import { HTTP_STATUS } from "../utils/httpCode.js";
import ApiError from "../utils/apiError.js";

export const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      VALIDATION_MESSAGE.VALIDATION_FAILED,
      errors.array(),
    );
  }

  const result = await userService.registerUser(req.body);
  successResponse(
    res,
    result,
    HTTP_STATUS.CREATED,
    USER_MESSAGES.REGISTER_SUCCESS,
  );
});

export const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      VALIDATION_MESSAGE.VALIDATION_FAILED,
      errors.array(),
    );
  }

  const result = await userService.loginUser(req.body);
  successResponse(res, result, HTTP_STATUS.OK, USER_MESSAGES.LOGIN_SUCCESS);
});

export const changePassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      VALIDATION_MESSAGE.VALIDATION_FAILED,
      errors.array(),
    );
  }

  const { oldPassword, newPassword } = req.body;
  await userService.changePassword(req.user._id, oldPassword, newPassword);
  successResponse(res, null, HTTP_STATUS.OK, USER_MESSAGES.PASSWORD_CHANGED);
});

export const editUser = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const user = await userService.editUser(req.user._id, name);
  successResponse(res, user, HTTP_STATUS.OK, USER_MESSAGES.USER_UPDATED);
});
