import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
 
export const getAllOutcomes = createAsyncThunk(
    'outcome/getAll',
    async () => {
      try {
        const response = await axios.get('http://localhost:5353/getAll/outcome');
        return response.data.AllOutcomes;
      } catch (error) {
        throw error;
      }
    }
  );
  export const getOutcomeById = createAsyncThunk(
    'outcome/getById',
    async (outcomeId) => {
      try {
        const response = await axios.get(`http://localhost:5353/getById/outcome/${outcomeId}`);
        return response.data.outcomeById;
      } catch (error) {
        throw error;
      }
    }
  )

const initialState = {
    loading: false,
    error: null,
    successMessage: '',  
    outcomes: [],
    outcomeById:null
};
 
  const outcomeSlice = createSlice({
    name: 'outcome',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllOutcomes.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getAllOutcomes.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.outcomes = action.payload;
          })
          .addCase(getAllOutcomes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(getOutcomeById.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getOutcomeById.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.outcomeById = action.payload;
          })
          .addCase(getOutcomeById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
    },
  });
 
  export default outcomeSlice.reducer;