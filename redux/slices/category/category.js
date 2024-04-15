import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

// Define the async thunk to fetch category data
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    try {
      const response = await Axios.get("http://localhost:5353/getAll/category");
      return response.data.Category;
    } catch (error) {
      throw error;
    }
  }
);

// Define the async thunk to add a new category
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (formData) => {
    try {
      const response = await Axios.post(
        "http://localhost:5353/create/category",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data; // Assuming the API returns the added category data
    } catch (error) {
      throw error;
    }
  }
);

// Create the category reducer
const categoryReducer = createSlice({
  name: "category",
  initialState: {
    categoryData: [],
    status: "idle",
    error: null,
    filters: {
      category: [], // Assuming category is an array
    },
  },
  reducers: {
    categorysFilterChange: (state, action) => {
      state.category = [...action.payload]; // Update category directly
      categoryReducer.caseReducers.updateFilteredData(state, action);
    },
    updateFilteredData: (state, action) => {
      if (!state.filters || state.filters.category.length === 0) {
        state.filteredData = state.categoryData; // Assuming categoryData is the source to filter
      } else {
        state.filteredData = state.categoryData.filter((categoryItem) =>
          state.filters.category.includes(categoryItem.category)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryData = action.payload;
        if (Object.keys(state.filters).length === 0) {
          state.filteredData = action.payload;
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the reducer, actions, and selector
export const { categorysFilterChange } = categoryReducer.actions;

export const selectCategories = (state) => state.category.categoryData;
export const selectAddCategoryError = (state) => state.category.error;
export default categoryReducer.reducer;
