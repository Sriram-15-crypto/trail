// qualificationLearningSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllQualificationLearning = createAsyncThunk(
    'qualificationLearning/getAll',
    async () => {
      try {
        const response = await axios.get('http://localhost:5353/getAll/qualification_learning');
        return response.data.qualificatioLearning;
      } catch (error) {
        throw Error(error.response.data.message); // Throw error to be caught by rejected action
      }
    }
  );
  export const getQualificationLearningById = createAsyncThunk(
    'qualificationLearning/getById',
    async (qualifylearnId) => {
      try {
        const response = await axios.get(`http://localhost:5353/getById/qualification_learning/${qualifylearnId}`);
        return response.data.qualificatioLearning;
      } catch (error) {
        throw Error(error.response.data.message);
      }
    }
  );

const initialState = {
  loading: false,
  error: null,
  qualifyLearn: null,
  data: [],
  selectedQualificationLearning: null,
};

const qualificationLearningSlice = createSlice({
  name: 'qualificationLearning',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllQualificationLearning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllQualificationLearning.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllQualificationLearning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getQualificationLearningById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQualificationLearningById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedQualificationLearning = action.payload;
      })
      .addCase(getQualificationLearningById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default qualificationLearningSlice.reducer;
