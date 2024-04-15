import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all eligibility criteria
export const getAllEligibilityCriteria = createAsyncThunk(
  "eligibilityCriteria/getAll",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5353/getAll/eligibility"
      );
      return response.data.allEligibilityCriteria;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to fetch eligibility criteria by ID
export const getEligibilityCriteriaById = createAsyncThunk(
  "eligibilityCriteria/getById",
  async (criteriaId) => {
    try {
      const response = await axios.get(
        `http://localhost:5353/getById/eligibility/${criteriaId}`
      );
      return response.data.eligibilityCriteriaById;
    } catch (error) {
      throw error;
    }
  }
);

// Define the initial state
const initialState = {
  loading: false,
  error: null,
  successMessage: "",
  eligibilityCriteria: [], // Updated key name
  eligibilityCriteriaById: null,
};

// Create an eligibilityCriteria slice
const eligibilityCriteriaSlice = createSlice({
  name: "eligibilityCriteria",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEligibilityCriteria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEligibilityCriteria.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.eligibilityCriteria = action.payload; // Updated state key
      })
      .addCase(getAllEligibilityCriteria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getEligibilityCriteriaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEligibilityCriteriaById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.eligibilityCriteriaById = action.payload;
      })
      .addCase(getEligibilityCriteriaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default eligibilityCriteriaSlice.reducer;
