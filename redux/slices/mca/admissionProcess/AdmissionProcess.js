import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  admissions: [], // Include the admissions property in the initial state
  admissionById: null,
  admissionById: null,
  successMessage: null,
};

export const getAllAdmissionProcess = createAsyncThunk(
  "admission/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5353/getAll/admission"
      );
      return response.data.admission;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getAdmissionProcessById = createAsyncThunk(
  "admission/getById",
  async (admissionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5353/getById/admission/${admissionId}`
      );
      const admissionData = response.data.admissionById;

      // Modify the data structure if needed to match your Redux store
      const formattedData = {
        _id: admissionData._id,
        heading: admissionData.admission.map((item) => item.heading),
        degree_program: admissionData.degree_program._id,
      };

      return formattedData;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const admissionProcessSlice = createSlice({
  name: "admission",
  initialState,
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdmissionProcess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdmissionProcess.fulfilled, (state, action) => {
        state.loading = false;
        state.admissions = action.payload;
      })
      .addCase(getAllAdmissionProcess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAdmissionProcessById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdmissionProcessById.fulfilled, (state, action) => {
        state.loading = false;
        state.admissionById = action.payload;
      })
      .addCase(getAdmissionProcessById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearSuccessMessage } = admissionProcessSlice.actions;

export default admissionProcessSlice.reducer;
