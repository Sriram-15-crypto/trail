import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
export const fetchProgramMentors = createAsyncThunk(
  "programMentors/fetchProgramMentors",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5353/getAll/program_mentor"
      );
      return response.data.programMentor;
    } catch (error) {
      throw error;
    }
  }
);
 
export const fetchProgramMentorById = createAsyncThunk(
  "programMentors/fetchById",
  async (mentorId) => {
    try {
      const response = await axios.get(
        `http://localhost:5353/getById/program_mentor/${mentorId}`
      );
      return response.data.programMentor;
    } catch (error) {
      throw Error("Error fetching program mentor details");
    }
  }
);
 
const initialState = {
  status: "idle",
  error: null,
  programMentors: [],
  selectedProgramMentor: {},
};
 
const programMentorSlice = createSlice({
  name: "programMentors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgramMentors.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProgramMentors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.programMentors = action.payload;
      })
      .addCase(fetchProgramMentors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProgramMentorById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProgramMentorById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProgramMentor = action.payload;
      })
      .addCase(fetchProgramMentorById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});
 
export default programMentorSlice.reducer;
export const selectProgramMentors = (state) => state.programMentors.programMentors;
export const selectProgramMentorStatus = (state) => state.programMentors.status;
export const selectProgramMentorError = (state) => state.programMentors.error;
export const selectSelectedProgramMentor = (state) => state.programMentors.selectedProgramMentor;