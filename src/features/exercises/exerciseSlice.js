import { createSlice } from '@reduxjs/toolkit';

export const exerciseSlice = createSlice({
  name: 'exercises',
  initialState: {
    value: [],
  },
  reducers: {
    setExercises: (state, action) => {
      state.value = action.payload;
    },
    clearExercises: state => {
      state.value = [];
    }
  }
});

export const { setExercises, clearExercises } = exerciseSlice.actions;

export const selectExercises = state => state.value;

export default exerciseSlice.reducer;
