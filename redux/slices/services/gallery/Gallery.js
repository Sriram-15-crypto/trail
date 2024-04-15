import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllGallery = createAsyncThunk("gallery/getAll", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5353/getAll/service_gallery"
    );
    return response.data.getAllGallery;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  loading: false,
  error: null,
  successMessage: "",
  galleries: [],
  selectedGallery: null,
  serviceData: [],
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllGallery.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.galleries = action.payload;
      })

      .addCase(getAllGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gallerySlice.reducer;
