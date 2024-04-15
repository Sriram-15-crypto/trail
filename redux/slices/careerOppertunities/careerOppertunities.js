import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchCareerOpportunities = createAsyncThunk(
  "careerOpportunities/fetchCareerOpportunities",
  async () => {
    try {
      const response = await Axios.get(
        "http://localhost:5353/getAll/careeroppertunities"
      );
      return response.data; // Assuming the API returns data directly
    } catch (error) {
      throw error;
    }
  }
);

const careerOpportunitiesSlice = createSlice({
  name: "careerOpportunities",
  initialState: {
    status: "idle",
    error: null,
    opportunitiesData: [], // Update initial state to an empty array
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareerOpportunities.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCareerOpportunities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.opportunitiesData = action.payload; // Update opportunitiesData with fetched data
      })
      .addCase(fetchCareerOpportunities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const selectCareerOpportunities = (state) => state.careerOpportunities.opportunitiesData;
export const selectCareerOpportunitiesError = (state) => state.careerOpportunities.error;

export default careerOpportunitiesSlice.reducer;
