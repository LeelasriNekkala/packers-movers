import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import servicesReducer from "./features/services/servicesSlice";
import ordersReducer from "./features/orders/orderSlice"; // ✅ ADD

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    orders: ordersReducer, // ✅ ADD THIS
  },
});
