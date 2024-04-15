import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for creating/applying
export const createApplyNow = createAsyncThunk(
  'applyNow/createApplyNow',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5353/create/courseapplynow', formData);
      return response.data; // Assuming the response contains relevant data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
    'applyNow/verifyOTP',
    async ({ otp, email }, thunkAPI) => {
      try {
        const response = await axios.post('http://localhost:5353/otp/verify', { otp, email });
        return response.data; // Assuming the response contains relevant data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const resendOTP = createAsyncThunk(
    'applyNow/resendOTP',
    async (email, thunkAPI) => {
      try {
        const response = await axios.post('http://localhost:5353/otp/resend', { email });
        return response.data; // Assuming the response contains relevant data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

// Create slice for applyNow
const applyNowSlice = createSlice({
  name: 'applyNow',
  initialState: {
    isLoading: false,
    error: null,
    successMessage: null,
    verified: false,
    resent: false,


  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createApplyNow.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createApplyNow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message; // Assuming API returns a message
      })
      .addCase(createApplyNow.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.error : 'Error creating/applying'; // Default error message
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.isLoading = false;
        state.verified = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.error : 'Error verifying OTP'; // Default error message
      })
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state) => {
        state.isLoading = false;
        state.resent = true;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.error : 'Error resending OTP'; // Default error message
      });
  },
});

export default applyNowSlice.reducer;
