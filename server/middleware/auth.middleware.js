import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check cookie first
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // 2️⃣ Check Authorization header
    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 3️⃣ If no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};
