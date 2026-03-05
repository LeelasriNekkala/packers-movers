import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

/* =====================================================
   GET ALL SERVICES (PUBLIC)
===================================================== */
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/services");
      return data.services; // adjust if backend structure differs
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch services",
      );
    }
  },
);

/* =====================================================
   CREATE SERVICE (ADMIN)
===================================================== */
export const createService = createAsyncThunk(
  "services/createService",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/services", formData);
      return data.service;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create service",
      );
    }
  },
);

/* =====================================================
   UPDATE SERVICE (ADMIN)
===================================================== */
export const updateService = createAsyncThunk(
  "services/updateService",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/services/${id}`, formData);
      return data.service;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update service",
      );
    }
  },
);

/* =====================================================
   DELETE SERVICE (ADMIN)
===================================================== */
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/services/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete service",
      );
    }
  },
);

/* =====================================================
   SLICE
===================================================== */
const servicesSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    loading: false,
    error: null,
    success: null,
  },

  reducers: {
    clearServiceState: (state) => {
      state.error = null;
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CREATE */
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
        state.success = "Service created successfully";
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE */
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Service updated successfully";

        const index = state.services.findIndex(
          (service) => service._id === action.payload._id,
        );

        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Service deleted successfully";
        state.services = state.services.filter(
          (service) => service._id !== action.payload,
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearServiceState } = servicesSlice.actions;
export default servicesSlice.reducer;
