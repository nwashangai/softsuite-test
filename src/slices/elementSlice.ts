import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ElementState, Mode } from './types';
import { AppThunk } from '../store';
import { request } from '../utilities/request';

const initialState: { mode: Mode; value: ElementState; isLoading: boolean } = {
  mode: Mode.create,
  value: {
    name: '',
    description: '',
    reportingName: '',
    processingType: '',
    status: 'inactive',
    prorate: '',
    effectiveStartDate: '',
    effectiveEndDate: '',
    selectedMonths: [],
    payFrequency: '',
  },
  isLoading: false,
};

const resetValues: Partial<ElementState> = {
  name: '',
  description: '',
  reportingName: '',
  processingType: '',
  payRunValueId: undefined,
  categoryValueId: undefined,
  classificationValueId: undefined,
  status: 'inactive',
  prorate: '',
  effectiveStartDate: '',
  effectiveEndDate: '',
  selectedMonths: [],
  payFrequency: '',
};

const elementSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {
    editElement: (state, action: PayloadAction<Partial<ElementState>>) => {
      state.value = { ...state.value, ...action.payload };
      state.mode = Mode.edit;
      state.isLoading = false;
    },
    updateElement: (state, action: PayloadAction<Partial<ElementState>>) => {
      state.value = { ...state.value, ...action.payload };
      state.isLoading = false;
    },
    resetElement: (state) => {
      state.value = { ...state.value, ...resetValues };
      state.isLoading = false;
    },
    createMode: (state) => {
      state.mode = Mode.create;
    },
    toggleLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action?.payload || false;
    },
  },
});

export const fetchElementById =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const element = await request(
        `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${id}`
      );
      dispatch(updateElement({ ...element.data }));
    } catch (error) {}
  };

export const setEditMode =
  (payload: Partial<ElementState>): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(editElement(payload));
    } catch (error) {}
  };

export const {
  editElement,
  resetElement,
  updateElement,
  toggleLoading,
  createMode,
} = elementSlice.actions;
export default elementSlice.reducer;
