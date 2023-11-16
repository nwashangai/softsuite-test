import { Action, configureStore } from '@reduxjs/toolkit';
import elementSlice from './slices/elementSlice';
import allElementsSlice from './slices/allElementsSlice';
import lookupSlice from './slices/lookupSlice';
import allElementLinkSlice from './slices/allElementLinkSlice';
import thunk, { ThunkAction } from 'redux-thunk';

const store = configureStore({
  reducer: {
    element: elementSlice,
    allElements: allElementsSlice,
    allElementLinks: allElementLinkSlice,
    lookup: lookupSlice,
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
