import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllClient = createAsyncThunk("client/getAll", async () => {
  try {
    const response = await axios.get("http://localhost:5353/getAll/client");
    return response.data.AllCompanyLogos;
  } catch (error) {
    throw error;
  }
});
export const getClientById = createAsyncThunk("client/getById", async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5353/getById/client/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  loading: false,
  error: null,
  successMessage: "",
  clients: [],
  selectedClientById: null,
  serviceData: [],
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllClient.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.clients = action.payload;
      })
      .addCase(getAllClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getClientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedClientById = action.payload.companyLogoById;
      })
      .addCase(getClientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default clientSlice.reducer;
export const selectClients = (state) => state.clients.clients;
