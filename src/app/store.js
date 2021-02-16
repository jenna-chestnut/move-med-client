import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from '../features/exercises/exerciseSlice';
import userReducer from '../features/user/userSlice';
import adminReducer from '../features/admin/adminSlice';
import errorReducer from '../features/appError/appErrorSlice';
import idleReducer from '../features/idle/idleSlice';

export default configureStore({
  reducer: {
    error: errorReducer,
    idle: idleReducer,
    exercises: exerciseReducer,
    user: userReducer,
    admin: adminReducer
  },
});
