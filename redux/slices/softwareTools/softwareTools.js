import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addSoftwareTools = createAsyncThunk(
  "softwareTools/addSoftwareTools",
  async ({ softwareTools, description, images }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("software_name", softwareTools);
      formData.append("description", description);

      for (const image of images) {
        formData.append("image", image);
      }

      const response = await axios.post(
        "http://localhost:5353/create/toolSoftware",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSoftwareTools = createAsyncThunk(
  "softwareTools/fetchSoftwareTools",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5353/getAll/toolSoftware"
      );
      return response.data.careerOpportunities;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  softwareToolsData: null,
  softwareTools: [],
};

const softwareToolsSlice = createSlice({
  name: "softwareTools",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSoftwareTools.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addSoftwareTools.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.softwareToolsData = action.payload;
      })
      .addCase(addSoftwareTools.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchSoftwareTools.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSoftwareTools.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.softwareTools = action.payload;
      })
      .addCase(fetchSoftwareTools.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default softwareToolsSlice.reducer;
export const selectSoftwareTools = (state) => state.softwareTools.softwareTools;
export const selectSoftwareToolsStatus = (state) => state.softwareTools.status;
export const selectSoftwareToolsError = (state) => state.softwareTools.error;
export const selectSoftwareToolsData = (state) =>
  state.softwareTools.softwareToolsData;
