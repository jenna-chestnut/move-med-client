import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from '../features/exercises/exerciseSlice';
import userReducer from '../features/user/userSlice';

export default configureStore({
  reducer: {
    exercises: exerciseReducer,
    user: userReducer,
  },
});
