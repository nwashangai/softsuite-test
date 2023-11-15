import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ElementState } from './types';
import { AppThunk } from '../store';
import { request } from '../utilities/request';
import { loadDependencyData } from '../utilities/loadDependencyData';

const initialState: {
  value: ElementState[];
  isLoading: boolean;
  lookUpCache: { [key: string]: any };
  total: number;
} = {
  value: [],
  isLoading: true,
  lookUpCache: {},
  total: 0,
};

const elementSlice = createSlice({
  name: 'allElements',
  initialState,
  reducers: {
    setElements: (
      state,
      action: PayloadAction<{ total: number; content: ElementState[] }>
    ) => {
      state.value = [...action.payload.content];
      state.total = action.payload.total;
      state.isLoading = false;
    },
    addNewElement: (state, action: PayloadAction<ElementState>) => {
      state.value = [...state.value, action.payload];
    },
    replaceElement: (
      state,
      action: PayloadAction<{ id: String; updatedElement: ElementState }>
    ) => {
      const { id, updatedElement } = action.payload;
      const indexToReplace = state.value.findIndex((item) => item.id === id);

      if (indexToReplace !== -1) {
        state.value[indexToReplace] = updatedElement;
      }
    },
    deleteItemById: (state, action: PayloadAction<String>) => {
      const id = action.payload;
      state.value = state.value.filter((item) => item.id !== id);
    },
    updateCache: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      state.lookUpCache = {
        ...state.lookUpCache,
        [action.payload.key]: action.payload.value,
      };
    },
    toggleLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action?.payload || false;
    },
  },
});

export const fetchAllDataAsync = (): AppThunk => async (dispatch) => {
  try {
    const response = await request(
      'https://650af6bedfd73d1fab094cf7.mockapi.io/elements'
    );
    loadDependencyData(response.data.content, dispatch);
    dispatch(setElements(response.data));
  } catch (error) {}
};

export const {
  setElements,
  toggleLoading,
  updateCache,
  addNewElement,
  replaceElement,
  deleteItemById,
} = elementSlice.actions;
export default elementSlice.reducer;
