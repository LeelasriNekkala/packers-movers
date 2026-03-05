import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    fromLocation: {
      type: String,
      required: true,
    },
    toLocation: {
      type: String,
      required: true,
    },
    moveDate: {
      type: Date,
      required: true,
    },
    houseSize: {
      type: String, // 1BHK, 2BHK etc
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true },
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry; // ✅ VERY IMPORTANT
