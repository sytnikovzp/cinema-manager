import { createSlice } from '@reduxjs/toolkit';

import { ACTORS_SLICE_NAME } from '../../constants';
import { setErrorState, setFetchingState } from '../../utils/reduxHelpers';

import {
  addActor,
  editActor,
  fetchAllActors,
  removeActor,
} from '../thunks/actorsThunk';

const actorsState = [
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
  actors: actorsState,
  status: null,
  error: null,
};

const actorsSlice = createSlice({
  name: ACTORS_SLICE_NAME,
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = null;
    },
  },

  extraReducers: (builder) => {
    // Success
    builder.addCase(fetchAllActors.fulfilled, (state, { payload }) => {
      state.actors = payload;
      state.status = null;
      state.error = null;
    });
    builder.addCase(addActor.fulfilled, (state, { payload }) => {
      state.actors.push(payload);
      state.status = 'Actor created successfully!';
      state.error = null;
    });
    builder.addCase(editActor.fulfilled, (state, { payload }) => {
      state.actors = state.actors.map((actor) =>
        (actor.id === payload.id ? payload : actor)
      );
      state.status = 'Actor updated successfully!';
      state.error = null;
    });
    builder.addCase(removeActor.fulfilled, (state, { payload }) => {
      state.actors = state.actors.filter((actor) => actor.id !== payload);
      state.status = 'Actor deleted successfully!';
      state.error = null;
    });

    // Pending
    builder.addCase(fetchAllActors.pending, setFetchingState);
    builder.addCase(addActor.pending, setFetchingState);
    builder.addCase(editActor.pending, setFetchingState);
    builder.addCase(removeActor.pending, setFetchingState);

    // Error
    builder.addCase(fetchAllActors.rejected, setErrorState);
    builder.addCase(addActor.rejected, (state, { payload }) => {
      state.status = 'Failed to create actor!';
      state.error = payload;
    });
    builder.addCase(editActor.rejected, (state, { payload }) => {
      state.status = 'Failed to update actor!';
      state.error = payload;
    });
    builder.addCase(removeActor.rejected, (state, { payload }) => {
      state.status = 'Failed to delete actor!';
      state.error = payload;
    });
  },
});

export const { resetStatus } = actorsSlice.actions;

export default actorsSlice.reducer;
