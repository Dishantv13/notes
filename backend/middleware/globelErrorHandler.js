import ApiError from "../utils/apiError.js";
import { HTTP_STATUS } from "../utils/httpCode.js";

const globalErrorHandler = (err, req, res, next) => {
  console.error("Error Details:", err);
  let { statusCode, message } = err;

  if (!(err instanceof ApiError)) {
    statusCode = statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    message = message || "Internal server error";
  }

  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    ...(err.errors && { errors: err.errors }),
  };

  res.status(statusCode).json(response);
};

export { globalErrorHandler };
