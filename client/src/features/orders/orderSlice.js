import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

/* CREATE INQUIRY */
export const createInquiry = createAsyncThunk(
  "orders/createInquiry",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/inquiries", formData);
      return data.inquiry || data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit inquiry",
      );
    }
  },
);

/* FETCH INQUIRIES */
export const fetchInquiries = createAsyncThunk(
  "orders/fetchInquiries",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/inquiries");
      return data.inquiries || data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch inquiries",
      );
    }
  },
);

/* DELETE INQUIRY */
export const deleteInquiry = createAsyncThunk(
  "orders/deleteInquiry",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/inquiries/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete inquiry",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    inquiries: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearOrderState: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* CREATE */
      .addCase(createInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Inquiry submitted successfully";
        state.inquiries.unshift(action.payload); // 🔥 instantly update UI
      })
      .addCase(createInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH */
      .addCase(fetchInquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload;
      })
      .addCase(fetchInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteInquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Inquiry deleted";
        state.inquiries = state.inquiries.filter(
          (inq) => inq._id !== action.payload,
        );
      })
      .addCase(deleteInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
