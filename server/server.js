import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import quoteRoutes from "./routes/quote.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import orderRoutes from "./routes/order.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

dotenv.config();

// ✅ connect database
connectDB();

const app = express();

// middlewares
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://packers-movers-beige.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorMiddleware);

// health check
app.get("/", (req, res) => {
  res.send("Packers & Movers API running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
