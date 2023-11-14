import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ElementState, Mode } from './types';
import { AppThunk } from '../store';
import { request } from '../utilities/request';
import {
  extractLookupIds,
  extractLookupValues,
} from '../utilities/extractLookups';

const initialState: { mode: Mode; value: ElementState; isLoading: boolean } = {
  mode: Mode.create,
  value: {
    name: '',
    description: '',
    reportingName: '',
    processingType: '',
    status: 'not active',
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
  status: 'not active',
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
      return {
        ...state,
        value: { ...state.value, ...resetValues },
        mode: Mode.create,
        isLoading: false,
      };
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
    const [classificationValues, categoryValues, payValues] = await Promise.all(
      [
        request(
          `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${structuredData.classificationId}/lookupvalues`
        ),
        request(
          `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${structuredData.categoryId}/lookupvalues`
        ),
        request(
          `https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${structuredData.payRunId}/lookupvalues`
        ),
      ]
    );
    dispatch(
      updateElement({
        classificationValues: extractLookupValues(classificationValues),
        categoryValues: extractLookupValues(categoryValues),
        payValues: extractLookupValues(payValues),
      })
    );
  } catch (error) {}
};

export const { editElement, resetElement, updateElement, toggleLoading } =
  elementSlice.actions;
export default elementSlice.reducer;
