import { createSlice } from '@reduxjs/toolkit';

import { DIRECTORS_SLICE_NAME } from '../../constants';
import { setErrorState, setFetchingState } from '../../utils/reduxHelpers';

import {
  addDirector,
  editDirector,
  fetchDirectors,
  removeDirector,
} from '../thunks/directorsThunk';

const directorsState = [
  {
    id: null,
    fullName: '',
    country: '',
    birthDate: '',
    deathDate: '',
    photo: '',
    biography: '',
  },
];

const initialState = {
  directors: directorsState,
  status: null,
  error: null,
};

const directorsSlice = createSlice({
  name: DIRECTORS_SLICE_NAME,
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = null;
    },
  },

  extraReducers: (builder) => {
    // Success
    builder.addCase(fetchDirectors.fulfilled, (state, { payload }) => {
      state.directors = payload;
      state.status = null;
      state.error = null;
    });
    builder.addCase(addDirector.fulfilled, (state, { payload }) => {
      state.directors.push(payload);
      state.status = 'Director created successfully!';
      state.error = null;
    });
    builder.addCase(editDirector.fulfilled, (state, { payload }) => {
      state.directors = state.directors.map((director) =>
        (director.id === payload.id ? payload : director)
      );
      state.status = 'Director updated successfully!';
      state.error = null;
    });
    builder.addCase(removeDirector.fulfilled, (state, { payload }) => {
      state.directors = state.directors.filter(
        (director) => director.id !== payload
      );
      state.status = 'Director deleted successfully!';
      state.error = null;
    });

    // Pending
    builder.addCase(fetchDirectors.pending, setFetchingState);
    builder.addCase(addDirector.pending, setFetchingState);
    builder.addCase(editDirector.pending, setFetchingState);
    builder.addCase(removeDirector.pending, setFetchingState);

    // Error
    builder.addCase(fetchDirectors.rejected, setErrorState);
    builder.addCase(addDirector.rejected, (state, { payload }) => {
      state.status = 'Failed to create director!';
      state.error = payload;
    });
    builder.addCase(editDirector.rejected, (state, { payload }) => {
      state.status = 'Failed to update director!';
      state.error = payload;
    });
    builder.addCase(removeDirector.rejected, (state, { payload }) => {
      state.status = 'Failed to delete director!';
      state.error = payload;
    });
  },
});

export const { resetStatus } = directorsSlice.actions;

export default directorsSlice.reducer;
