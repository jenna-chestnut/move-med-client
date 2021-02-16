import { createSlice } from '@reduxjs/toolkit';

export const idleSlice = createSlice({
  name: 'idle',
  initialState: {
    idle: false
  },
  reducers: {
    setIdle: state => {
      state.idle = true;
      },
    clearIdle: state => {
      state.idle = false;
    }
  }
});

export const { setIdle, clearIdle } = idleSlice.actions;

export const selectIdle = state => state.idle.idle;

export default idleSlice.reducer;
