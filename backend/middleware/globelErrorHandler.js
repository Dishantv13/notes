import ApiError from "../utils/apiError.js";

const globalErrorHandler = (err, req, res, next) => {
  console.error('Error Details:', err);
  let { statusCode, message } = err;

  if (!(err instanceof ApiError)) {
    statusCode = statusCode || 500;
    message = message || "Internal server error";
  }

  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    ...(err.errors && { errors: err.errors })
  };

  res.status(statusCode).json(response);
};

export { globalErrorHandler };
