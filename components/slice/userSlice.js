// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 🔁 Async thunk to fetch users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/users',{
        method: 'GET',
      });
      if (!res.ok) {
        return rejectWithValue('Failed to fetch users');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🧩 Initial state
const initialState = {
  users: [],
  loading: false,
  error: null,
};

// 🧱 Slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default usersSlice.reducer;
