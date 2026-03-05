import Order from "../models/Order.js";
import Service from "../models/Service.js";

// ✅ User creates order
export const createOrder = async (req, res) => {
  try {
    const { service, fromLocation, toLocation, moveDate } = req.body;

    // 🔍 Check service exists
    const selectedService = await Service.findById(service);

    if (!selectedService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // ✅ Create order
    const order = await Order.create({
      user: req.user._id, // get logged-in user
      service,
      fromLocation,
      toLocation,
      moveDate,
      price: selectedService.price, // auto set price
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ User views own orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("service")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get My Orders Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Admin views all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user service")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get All Orders Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Admin updates order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Update Order Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
