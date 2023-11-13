import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ElementState } from './types';

const initialState: ElementState = {
  name: '',
  description: '',
  payRunId: 0,
  payRunValueId: 0,
  classificationId: 0,
  classificationValueId: 0,
  categoryId: 0,
  categoryValueId: 0,
  reportingName: '',
  processingType: '',
  status: '',
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
    updateElement: (state, action: PayloadAction<Partial<ElementState>>) => {
      return { ...state, ...action.payload };
    },
    resetElement: (state) => {
      return initialState;
    },
  },
});

export const { updateElement, resetElement } = elementSlice.actions;
export default elementSlice.reducer;
