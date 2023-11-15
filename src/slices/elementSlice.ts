import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ElementState, Mode } from './types';
import { AppDispatch, AppThunk } from '../store';
import { request } from '../utilities/request';
import { extractLookupIds } from '../utilities/extractLookups';
import { getLookupValues } from '../utilities/loadDependencyData';

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
    classificationValues: [{ value: '', label: 'Loading...', disabled: true }],
    categoryValues: [{ value: '', label: 'Loading...', disabled: true }],
    payValues: [{ value: '', label: 'Loading...', disabled: true }],
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

export const fetchInitalDataAsync = (): AppThunk => async (dispatch) => {
  try {
    const response = await request(
      'https://650af6bedfd73d1fab094cf7.mockapi.io/lookups'
    );
    const structuredData = extractLookupIds(response.data);
    dispatch(updateElement(structuredData));
    getLookupValues(structuredData, dispatch as AppDispatch);
  } catch (error) {}
};

export const setEditMode =
  (payload: Partial<ElementState>): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(editElement(payload));
      getLookupValues(payload, dispatch as AppDispatch);
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
