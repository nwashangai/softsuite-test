import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LookupType, LookupValuesType } from './types';
import { AppThunk, AppDispatch } from '../store';
import { getLookupValues } from '../utilities/loadDependencyData';
import { request } from '../utilities/request';

const initialState: LookupType = {
  lookups: [],
  lookUpCache: {},
  elementCategoryValues: [{ value: '', label: 'Loading...', disabled: true }],
  elementClassificationValues: [
    { value: '', label: 'Loading...', disabled: true },
  ],
  employeeCategoryValues: [{ value: '', label: 'Loading...', disabled: true }],
  employeeTypeValues: [{ value: '', label: 'Loading...', disabled: true }],
  housingValues: [{ value: '', label: 'Loading...', disabled: true }],
  jobTitleValues: [{ value: '', label: 'Loading...', disabled: true }],
  locationValues: [{ value: '', label: 'Loading...', disabled: true }],
  payRunValues: [{ value: '', label: 'Loading...', disabled: true }],
  securityValues: [{ value: '', label: 'Loading...', disabled: true }],
  wardrobeValues: [{ value: '', label: 'Loading...', disabled: true }],
  unionValues: [{ value: '', label: 'Loading...', disabled: true }],
  subOrginazationValues: [{ value: '', label: 'Loading...', disabled: true }],
  departmentvalues: [{ value: '', label: 'Loading...', disabled: true }],
  loading: true,
};

const lookupSlice = createSlice({
  name: 'lookup',
  initialState,
  reducers: {
    setLookups: (state, action: PayloadAction<Array<LookupValuesType>>) => {
      state.lookups = action.payload;
      state.loading = false;
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
    setLookupValues: (state, action: PayloadAction<Partial<LookupType>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const fetchInitalDataAsync = (): AppThunk => async (dispatch) => {
  try {
    const response = await request(
      'https://650af6bedfd73d1fab094cf7.mockapi.io/lookups'
    );

    dispatch(setLookups(response.data));
    getLookupValues(response.data, dispatch as AppDispatch);
  } catch (error) {}
};

export const { setLookups, setLookupValues, updateCache } = lookupSlice.actions;
export default lookupSlice.reducer;
