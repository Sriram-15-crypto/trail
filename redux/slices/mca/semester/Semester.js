import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  semesters: [],
  semesterById: null,
};

export const getAllSemesters = createAsyncThunk(
  "semester/getAllSemesters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5353/getAll/semester");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSemesterById = createAsyncThunk(
  "semester/getSemesterById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5353/getById/semester/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const semesterSlice = createSlice({
  name: "semester",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSemesters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSemesters.fulfilled, (state, action) => {
        state.loading = false;
        state.semesters = action.payload.semester;
      })
      .addCase(getAllSemesters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSemesterById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.semesterById = null;
      })
      .addCase(getSemesterById.fulfilled, (state, action) => {
        state.loading = false;
        state.semesterById = action.payload.semesterById;
      })
      .addCase(getSemesterById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default semesterSlice.reducer;
