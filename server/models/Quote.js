import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    fromLocation: {
      type: String,
      required: true,
      trim: true,
    },

    toLocation: {
      type: String,
      required: true,
      trim: true,
    },

    moveDate: {
      type: Date,
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "contacted", "converted"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Quote = mongoose.model("Quote", quoteSchema);
export default Quote;
