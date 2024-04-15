import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

// Async thunk for adding an instructor
export const addInstructor = createAsyncThunk(
  "instructor/addInstructor",
  async (formData) => {
    try {
      // Make a POST request to the backend API endpoint
      const response = await Axios.post(
        "http://localhost:5353/create/instructor",
        formData
      );

      // Return the response data
      return response.data;
    } catch (error) {
      // Throw an error with the response data if available
      throw error.response ? error.response.data : error;
    }
  }
);

export const fetchInstructors = createAsyncThunk(
  "instructors/fetchInstructors",
  async () => {
    try {
      const response = await Axios.get(
        "http://localhost:5353/getAll/instructor"
      );
      return response.data.Instructor;
    } catch (error) {
      throw error;
    }
  }
);

// Instructor slice with initial state and reducers
const instructorSlice = createSlice({
  name: "instructor",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: "",
  },
  reducers: {
    resetInstructor: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addInstructor.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(addInstructor.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(addInstructor.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload
        ? action.payload.errorMessage
        : action.error.message;
    });
    builder.addCase(fetchInstructors.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchInstructors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.instructors = action.payload;
    });
    builder.addCase(fetchInstructors.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { resetInstructor } = instructorSlice.actions;

// Selector function to get the instructor state
export const selectInstructorState = (state) => state.instructor;

// Export the reducer
export default instructorSlice.reducer;
