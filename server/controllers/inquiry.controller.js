import Inquiry from "../models/Inquiry.js";

// ================= USER — CREATE =================
export const createInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: inquiry,
    });
  } catch (error) {
    console.error("Create inquiry error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= ADMIN — GET ALL =================
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: inquiries.length,
      inquiries,
    });
  } catch (error) {
    console.error("Get inquiries error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= ADMIN — DELETE =================
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete inquiry error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
