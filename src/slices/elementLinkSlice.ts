import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ElementLinkState, Mode } from './types';
import { AppThunk } from '../store';

const initialState: {
  mode: Mode;
  value: ElementLinkState;
  isLoading: boolean;
} = {
  mode: Mode.create,
  value: {
    name: '',
    elementId: '',
    rate: '',
    effectiveStartDate: '',
    effectiveEndDate: '',
    status: 'inactive',
    automate: '',
    additionalInfo: [],
  },
  isLoading: false,
};

const resetValues: ElementLinkState = {
  name: '',
  elementId: '',
  rate: '',
  effectiveStartDate: '',
  effectiveEndDate: '',
  status: 'inactive',
  automate: '',
  additionalInfo: [],
};

const elementSlice = createSlice({
  name: 'elementLink',
  initialState,
  reducers: {
    editElementLink: (
      state,
      action: PayloadAction<Partial<ElementLinkState>>
    ) => {
      state.value = { ...state.value, ...action.payload };
      state.mode = Mode.edit;
      state.isLoading = false;
    },
    updateElementLink: (
      state,
      action: PayloadAction<Partial<ElementLinkState>>
    ) => {
      state.value = { ...state.value, ...action.payload };
      state.isLoading = false;
    },
    updateAdditionalAssignmentInfo: (
      state,
      action: PayloadAction<{ lookupId: string; lookupValueId: string }>
    ) => {
      const indexToReplace = state.value.additionalInfo.findIndex(
        (item) => item.lookupId.toString() === action.payload.lookupId
      );

      if (indexToReplace !== -1) {
        state.value.additionalInfo[indexToReplace] = action.payload;
      } else {
        state.value.additionalInfo = [
          ...state.value.additionalInfo,
          action.payload,
        ];
      }
    },
    resetElementLink: (state, action: PayloadAction<string>) => {
      state.value = { ...resetValues, elementId: action.payload };
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

export const setEditMode =
  (payload: Partial<ElementLinkState>): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(editElementLink(payload));
    } catch (error) {}
  };

export const {
  editElementLink,
  resetElementLink,
  updateElementLink,
  toggleLoading,
  createMode,
  updateAdditionalAssignmentInfo,
} = elementSlice.actions;
export default elementSlice.reducer;
