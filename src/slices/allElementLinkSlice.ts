import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ElementLinkState } from './types';
import { AppThunk } from '../store';
import { request } from '../utilities/request';

const initialState: {
  value: ElementLinkState[];
  isLoading: boolean;
} = {
  value: [],
  isLoading: true,
};

const elementSlice = createSlice({
  name: 'allElementLinks',
  initialState,
  reducers: {
    setElementLinks: (
      state,
      action: PayloadAction<{ total: number; content: ElementLinkState[] }>
    ) => {
      state.value = [...action.payload.content];
      state.isLoading = false;
    },
    addNewElementLink: (state, action: PayloadAction<ElementLinkState>) => {
      state.value = [...state.value, action.payload];
    },
    replaceElementLink: (
      state,
      action: PayloadAction<{
        id: String;
        updatedElementLink: ElementLinkState;
      }>
    ) => {
      const { id, updatedElementLink } = action.payload;
      const indexToReplace = state.value.findIndex((item) => item.id === id);

      if (indexToReplace !== -1) {
        state.value[indexToReplace] = updatedElementLink;
      }
    },
    deleteItemById: (state, action: PayloadAction<String>) => {
      const id = action.payload;
      console.log(id, typeof id);

      state.value = state.value.filter((item) => item.id?.toString() !== id);
    },
    toggleLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action?.payload || false;
    },
  },
});

export const fetchAllLinkDataAsync =
  (id: string, cache: { [key: string]: any }): AppThunk =>
  async (dispatch) => {
    try {
      const response = await request(
        `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${id}/elementlinks`
      );
      dispatch(setElementLinks(response.data));
    } catch (error) {}
  };

export const {
  setElementLinks,
  toggleLoading,
  addNewElementLink,
  replaceElementLink,
  deleteItemById,
} = elementSlice.actions;
export default elementSlice.reducer;
