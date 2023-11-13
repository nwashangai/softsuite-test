import { configureStore } from '@reduxjs/toolkit';
import elementSlice from './slices/elementSlice';

const store = configureStore({
  reducer: {
    element: elementSlice,
    // Add more reducers if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
