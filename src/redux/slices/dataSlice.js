import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("data/fetchData", () => {
  return axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/posts?userId=1&userId=2"),
      axios.get("https://jsonplaceholder.typicode.com/posts?userId=3&userId=4"),
    ])
    .then(
      axios.spread((response1, response2) => {
        return [...response1.data, ...response2.data];
      })
    )
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error so that createAsyncThunk handles it properly
    });
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
