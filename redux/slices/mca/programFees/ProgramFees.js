import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProgramFees = createAsyncThunk(
  "programFees/getAll",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5353/getAll/program_fees"
      );
      return response.data.program_feess;
    } catch (error) {
      throw error;
    }
  }
);
export const getProgramFeesById = createAsyncThunk(
  "programFees/getById",
  async (feesId) => {
    try {
      const response = await axios.get(
        `http://localhost:5353/getById/program_fees/${feesId}`
      );
      return response.data.programFeesById;
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
  programFees: [],
  programFeesById: null,
};

const programFeesSlice = createSlice({
  name: "programFees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProgramFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProgramFees.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.programFees = action.payload;
      })
      .addCase(getAllProgramFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProgramFeesById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgramFeesById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.programFeesById = action.payload;
      })
      .addCase(getProgramFeesById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default programFeesSlice.reducer;
