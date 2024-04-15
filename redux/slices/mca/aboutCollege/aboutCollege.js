import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAboutCollegeData = createAsyncThunk(
  "aboutCollege/fetchData",
  async () => {
    try {
      const response = await axios.get("http://localhost:5353/getAll/degree_Program");
      const data = response.data;
      return data.Degree_Program;
    } catch (error) {
      throw Error("Error fetching data");
    }
  }
);

const aboutCollegeSlice = createSlice({
  name: "aboutCollege",
  initialState: {
    loading: false,
    error: null,
    aboutCollegeData: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutCollegeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutCollegeData.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutCollegeData = action.payload;
      })
      .addCase(fetchAboutCollegeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default aboutCollegeSlice.reducer;
