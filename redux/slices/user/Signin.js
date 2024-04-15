import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendAPI = "http://localhost:5353";

export const postSignIn = createAsyncThunk(
  "postSignIn",
  async (values, { rejectWithValue }) => {
    let data = {
      email: values.email,
      password: values.password,
    };
    try {
      const res = await axios.post(`${backendAPI}/signin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const userVerify = createAsyncThunk(
  "userVerify",
  async ({ token }, { rejectWithValue }) => {
    try {
      console.log(`token=${token}`);
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_API + "/userVerify",
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("res", res);
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const signInSlice = createSlice({
  initialState: {
    isLoading: false,
    user: null,
    token: "",
    isError: false,
    error: "",
  },
  name: "signin",
  reducers: {
    resetSignIn: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSignIn.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(postSignIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });

    builder.addCase(postSignIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload.errorMessage || "An error occurred during login.";
      if (action.payload) {
        state.error = action.payload.errorMessage;
        console.log("error", action.payload.message[0].value);
      } else {
        state.error = action.error.message;
        console.log("error", action);
      }
    });

    builder.addCase(userVerify.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(userVerify.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });

    builder.addCase(userVerify.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      if (action.payload) {
        state.error = action.payload.errorMessage;
        console.log("error", action.payload.message[0].value);
      } else {
        state.error = action.error.message;
        console.log("error", action);
      }
    });
  },
});

export default signInSlice.reducer;
export const { resetSignIn } = signInSlice.actions;
