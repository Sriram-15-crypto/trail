import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchServices = createAsyncThunk(
  "service/fetchServices",
  async () => {
    try {
      const response = await Axios.get("http://localhost:5353/getAll/service");
      return response.data.get_all_services;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  "service/fetchById",
  async (serviceId) => {
    try {
      const response = await Axios.get(
        `http://localhost:5353/getById/service/${serviceId}`
      );
      return response.data.serviceById;
    } catch (error) {
      throw Error("Error fetching service details");
    }
  }
);

// Create the category reducer
const serviceReducer = createSlice({
  name: "service",
  initialState: {
    serviceData: [],
    status: "idle",
    error: "",
    service: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    selectedService: null,
  },
  reducers: {
    resetService: (state, action) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = "isLoading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.serviceData = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchServiceById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedService = action.payload;
        state.existingImages = action.payload.image
          ? [action.payload.image]
          : [];
      })

      .addCase(fetchServiceById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetService } = serviceReducer.actions;
export const selectServices = (state) => state.service.serviceData;
export const selectAddServiceError = (state) => state.service.error;
export default serviceReducer.reducer;
