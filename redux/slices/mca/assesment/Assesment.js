import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
export const addAssessment = createAsyncThunk(
  "assessments/addAssessment",
  async (assessmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5353/create/assesment",
        assessmentData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
 
export const fetchAssessments = createAsyncThunk(
  "assessments/fetchAssessments",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5353/getAll/assesment"
      );
      return response.data.assessments;
    } catch (error) {
      throw error;
    }
  }
);
 
export const fetchAssessmentById = createAsyncThunk(
  "assessments/fetchById",
  async (assessmentId) => {
    try {
      const response = await axios.get(
        `http://localhost:5353/getById/assesment/${assessmentId}`
      );
      return response.data.assessment;
    } catch (error) {
      throw Error("Error fetching assessment details");
    }
  }
);
 
export const updateAssessment = createAsyncThunk(
  "assessments/update",
  async ({ assessmentId, assessmentData }) => {
    try {
      const response = await axios.put(
        `http://localhost:5353/update/assesment/${assessmentId}`,
        assessmentData
      );
      return response.data.assessment;
    } catch (error) {
      throw Error("Error updating assessment");
    }
  }
);
 
export const deleteAssessment = createAsyncThunk(
  "assessments/delete",
  async (assessmentId) => {
    try {
      await axios.delete(
        `http://localhost:5353/delete/assesment/${assessmentId}`
      );
      return assessmentId;
    } catch (error) {
      throw Error("Error deleting assessment");
    }
  }
);
 
const initialState = {
  status: "idle",
  error: null,
  assessments: [],
  selectedAssessment: {},
};
 
const assessmentSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssessments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAssessments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assessments = action.payload;
      })
      .addCase(fetchAssessments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAssessmentById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAssessmentById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedAssessment = action.payload;
      })
      .addCase(fetchAssessmentById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateAssessment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateAssessment.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Optionally, you can update state or perform other actions upon successful update
      })
      .addCase(updateAssessment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteAssessment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteAssessment.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Optionally, you can update state or perform other actions upon successful deletion
      })
      .addCase(deleteAssessment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
 
export default assessmentSlice.reducer;
export const selectAssessments = (state) => state.assessments.assessments;
export const selectAssessmentStatus = (state) => state.assessments.status;
export const selectAssessmentError = (state) => state.assessments.error;
export const selectSelectedAssessment = (state) => state.assessments.selectedAssessment;