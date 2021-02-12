import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from '../features/exercises/exerciseSlice';
import userReducer from '../features/user/userSlice';
import adminReducer from '../features/admin/adminSlice';

export default configureStore({
  reducer: {
    exercises: exerciseReducer,
    user: userReducer,
    admin: adminReducer
  },
});
