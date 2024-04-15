import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const addExecutionHighlights = createAsyncThunk(
  "executionHighlights/addExecutionHighlights",
  async (formData) => {
    try {
      const response = await Axios.post(
        "http://localhost:5353/create/execution_highlight",
        formData
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
);

export const fetchExecutionHighlights = createAsyncThunk(
  "executionHighlights/fetchExecutionHighlights",
  async () => {
    try {
      const response = await Axios.get(
        "http://localhost:5353/getAll/execution_highlight"
      );
      return response.data.getAllExecutionHighlight;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchExecutionHighlightsById = createAsyncThunk(
  "executionHighlights/fetchById",
  async (executionHighlightId) => {
    try {
      const response = await Axios.get(
        `http://localhost:5353/getById/execution_highlight/${executionHighlightId}`
      );
      return response.data.serviceById;
    } catch (error) {
      throw Error("Error fetching ExecutionHighlights details");
    }
  }
);

export const updateExecutionHighlights = createAsyncThunk(
  "executionHighlights/update",
  async ({ executionHighlightId, formData }) => {
    try {
      const response = await Axios.put(
        `http://localhost:5353/update/execution_highlight/${executionHighlightId}`,
        formData
      );
      return response.data.executionHighlight;
    } catch (error) {
      throw Error("Error updating ExecutionHighlights");
    }
  }
);

export const deleteExecutionHighlights = createAsyncThunk(
  "executionHighlights/deleteExecutionHighlights",
  async (executionHighlightId) => {
    try {
      const response = await Axios.delete(
        `http://localhost:5353/delete/execution_highlight/${executionHighlightId}`
      );

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
);

const executionHighlightsSlice = createSlice({
  name: "executionHighlights",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: "",
    executionHighlights: [],
    executionHighlight: {},
    serviceById: null,
  },
  reducers: {
    resetExecutionHighlights: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addExecutionHighlights.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(addExecutionHighlights.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(addExecutionHighlights.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload
        ? action.payload.errorMessage
        : action.error.message;
    });
    builder.addCase(fetchExecutionHighlights.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchExecutionHighlights.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.executionHighlights = action.payload;
    });
    builder.addCase(fetchExecutionHighlights.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchExecutionHighlightsById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchExecutionHighlightsById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.serviceById = action.payload;
    });
    builder.addCase(fetchExecutionHighlightsById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateExecutionHighlights.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateExecutionHighlights.fulfilled, (state, action) => {
      state.isLoading = false;
      state.instructor = action.payload;
    });
    builder.addCase(updateExecutionHighlights.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteExecutionHighlights.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(deleteExecutionHighlights.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(deleteExecutionHighlights.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload
        ? action.payload.errorMessage
        : action.error.message;
    });
  },
});

export const { resetExecutionHighlights } = executionHighlightsSlice.actions;

export const selectExecutionHighlightsState = (state) =>
  state.executionHighlight;

export default executionHighlightsSlice.reducer;
