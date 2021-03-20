import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
      id: '',
      name: '',
      user_name: '',
      is_admin: false,
      is_provider: false,
      exp: null
  },
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;

      state._id = user.user_id;
      state.name = user.name;
      state.user_name = user.sub;
      state.is_admin = user.is_admin;
      state.is_provider = user.is_provider;
      state.exp = user.exp;
      },
    clearUser: state => {
      state._id = '';
      state.name = '';
      state.user_name = '';
      state.is_admin = false;
      state.is_provider = false;
      state.exp = null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = state => state.user;

export default userSlice.reducer;
