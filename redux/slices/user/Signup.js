// signup.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postSignUp = createAsyncThunk(
  "postSignUp",
  async (values, { rejectWithValue }) => {
    let data = {
      userName : values.userName,
      email : values.email,
      phone : values.phone,
      gender: values.gender,
      password : values.password,
    }
    try {
      const res = await  axios.post(  "http://localhost:5353/signup", data, 
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data;
    } catch (err) {
      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response.data)
    }
    
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: "",
  },
  reducers: {
    resetSignUp: (state) => {
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSignUp.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(postSignUp.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(postSignUp.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload
        ? action.payload.errorMessage
        : action.error.message;
    });
  },
});

export const { resetSignUp } = signupSlice.actions;

export const selectSignUpState = (state) => state.signup;

export default signupSlice.reducer;
