import { createSlice } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';
import { setErrorState, setFetchingState } from '../../utils/reduxHelpers';

import {
  addStudio,
  editStudio,
  fetchStudios,
  removeStudio,
} from '../thunks/studiosThunk';

const studiosState = [
  {
    uuid: null,
    title: '',
    location: '',
    foundationYear: '',
    logo: '',
    about: '',
  },
];

const initialState = {
  studios: studiosState,
  status: null,
  error: null,
};

const studiosSlice = createSlice({
  name: SLICE_NAMES.STUDIOS_SLICE_NAME,
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = null;
    },
  },

  extraReducers: (builder) => {
    // Success
    builder.addCase(fetchStudios.fulfilled, (state, { payload }) => {
      state.studios = payload;
      state.status = null;
      state.error = null;
    });
    builder.addCase(addStudio.fulfilled, (state, { payload }) => {
      state.studios.push(payload);
      state.status = 'Studio created successfully!';
      state.error = null;
    });
    builder.addCase(editStudio.fulfilled, (state, { payload }) => {
      state.studios = state.studios.map((studio) =>
        studio.uuid === payload.uuid ? payload : studio
      );
      state.status = 'Studio updated successfully!';
      state.error = null;
    });
    builder.addCase(removeStudio.fulfilled, (state, { payload }) => {
      state.studios = state.studios.filter((studio) => studio.uuid !== payload);
      state.status = 'Studio deleted successfully!';
      state.error = null;
    });

    // Pending
    builder.addCase(fetchStudios.pending, setFetchingState);
    builder.addCase(addStudio.pending, setFetchingState);
    builder.addCase(editStudio.pending, setFetchingState);
    builder.addCase(removeStudio.pending, setFetchingState);

    // Error
    builder.addCase(fetchStudios.rejected, setErrorState);
    builder.addCase(addStudio.rejected, (state, { payload }) => {
      state.status = 'Failed to create studio!';
      state.error = payload;
    });
    builder.addCase(editStudio.rejected, (state, { payload }) => {
      state.status = 'Failed to update studio!';
      state.error = payload;
    });
    builder.addCase(removeStudio.rejected, (state, { payload }) => {
      state.status = 'Failed to delete studio!';
      state.error = payload;
    });
  },
});

export const { resetStatus } = studiosSlice.actions;

export default studiosSlice.reducer;
