// server/middleware/error.middleware.js

const errorMiddleware = (err, req, res, next) => {
  console.error("🔥 Error:", err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // ✅ Mongo duplicate key error
  if (err.code === 11000) {
    message = "Duplicate field value entered";
    statusCode = 400;
  }

  // ✅ Mongo CastError (invalid ObjectId)
  if (err.name === "CastError") {
    message = `Resource not found with id ${err.value}`;
    statusCode = 404;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
