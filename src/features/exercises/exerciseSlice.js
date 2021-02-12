import { createSlice } from '@reduxjs/toolkit';

export const exerciseSlice = createSlice({
  name: 'exercises',
  initialState: {
    value: []
  },
  reducers: {
    setExercises: (state, action) => {
      const ex = action.payload;
      state.value = ex;
    },
    clearExercises: state => {
      state.value = [];
    }
  }
});

export const { setExercises, clearExercises } = exerciseSlice.actions;

export const selectExercises = state => state.exercises.value;

export default exerciseSlice.reducer;
