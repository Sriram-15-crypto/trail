import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
const initialState = {
  status: "idle",
  error: null,
  successMessage: null,
  highlights: [],
  highlight: null,
};
 
export const createHighlight = createAsyncThunk(
  "highlight/createHighlight",
  async (highlightData) => {
    try {
      const response = await axios.post(
        "http://localhost:5353/create/highlight",
        highlightData
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);
 
export const fetchAllHighlights = createAsyncThunk(
    "highlight/fetchAll",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:5353/getAll/highlight");
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
 
 
 
  export const getHighlightById = createAsyncThunk(
    "highlight/fetchById",
    async (highlightId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:5353/getById/highlight/${highlightId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
 
  export const updateHighlight = createAsyncThunk(
    "highlight/update",
    async ({ highlightId, data }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`http://localhost:5353/update/highlight/${highlightId}`, data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
 
  export const deleteHighlight = createAsyncThunk(
    "highlight/delete",
    async (highlightId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`http://localhost:5353/delete/highlight/${highlightId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
 
const highlightsSlice = createSlice({
  name: "highlight",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHighlight.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createHighlight.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.successMessage = action.payload.message;
      })
      .addCase(createHighlight.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(fetchAllHighlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllHighlights.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.highlights = action.payload.highlights;
      })
      .addCase(fetchAllHighlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : "Something went wrong";
      })
      .addCase(getHighlightById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHighlightById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.highlight = action.payload.highlightById;
      })
      .addCase(getHighlightById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : "Something went wrong";
      })
      .addCase(updateHighlight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHighlight.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.highlight = action.payload.updatedHighlight;
      })
      .addCase(updateHighlight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : "Something went wrong";
      })
      .addCase(deleteHighlight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHighlight.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.highlight = null;
      })
      .addCase(deleteHighlight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : "Something went wrong";
      });
  },
});
 
export default highlightsSlice.reducer;