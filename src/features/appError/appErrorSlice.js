import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
      message: null
  },
  reducers: {
    setError: (state, action) => {
      const err = action.payload;
      state.message = err;
      },
    clearError: state => {
      state.message = null;
    }
  }
});

export const { setError, clearError } = errorSlice.actions;

export const selectError = state => state.error.message;

export default errorSlice.reducer;
