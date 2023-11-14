import { Action, configureStore } from '@reduxjs/toolkit';
import elementSlice from './slices/elementSlice';
import thunk, { ThunkAction } from 'redux-thunk';

const store = configureStore({
  reducer: {
    element: elementSlice,
    // Add more reducers if needed
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
