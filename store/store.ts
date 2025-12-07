import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from './exercisesSlice';

export const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
  },
});

