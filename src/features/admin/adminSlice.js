import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: []
  },
  reducers: {
    setUsers: (state, action) => {
      const u = action.payload;
      state.users = u;
    },
    clearUsers: state => {
      state.users = [];
    }
  }
});

export const { setUsers, clearUsers } = adminSlice.actions;

export const selectUsers = state => state.admin.users;

export default adminSlice.reducer;
