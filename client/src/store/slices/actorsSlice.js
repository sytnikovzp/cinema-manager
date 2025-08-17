import { createSlice } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '@/src/constants';
import { setErrorState, setFetchingState } from '@/src/utils/reduxHelpers';

import {
  addActor,
  editActor,
  fetchAllActors,
  removeActor,
} from '@/src/store/thunks/actorsThunk';

const actorsState = [
  {
    uuid: null,
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
  name: SLICE_NAMES.ACTORS_SLICE_NAME,
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
        (actor.uuid === payload.uuid ? payload : actor)
      );
      state.status = 'Actor updated successfully!';
      state.error = null;
    });
    builder.addCase(removeActor.fulfilled, (state, { payload }) => {
      state.actors = state.actors.filter((actor) => actor.uuid !== payload);
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
