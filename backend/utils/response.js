import { HTTP_STATUS } from "./httpCode.js";
const successResponse = (
  res,
  data = null,
  statusCode = HTTP_STATUS.OK,
  message = "Success",
  pagination = null,
) => {
  const response = {
    success: true,
    message,
    data,
  };

  if (pagination) {
    response.pagination = pagination;
  }

  res.status(statusCode).json(response);
};

const errorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export { successResponse, errorResponse };
