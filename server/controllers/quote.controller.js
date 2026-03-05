import Quote from "../models/Quote.js";

// @desc   Create quote (User)
export const createQuote = async (req, res) => {
  try {
    const quote = await Quote.create(req.body);

    res.status(201).json({
      success: true,
      message: "Quote submitted successfully",
      quote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc   Get all quotes (Admin)
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: quotes.length,
      quotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc   Update quote status (Admin)
export const updateQuoteStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    res.json({
      success: true,
      message: "Quote status updated",
      quote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
