import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// =============================================
import { actorsState } from '../../model/initialStates';
import { ACTORS_SLICE_NAME } from '../../constants';
// =============================================
import api from '../../api';
import { setError, setStatus } from '../../services/reducer-service';

const initialState = {
  actors: actorsState,
  status: null,
  error: null,
};

export const getAllActors = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/getAllActors`,
  async (_, { rejectWithValue }) => {
    try {
      const { status, data } = await api.get(`/${ACTORS_SLICE_NAME}`);
      if (status >= 400) throw new Error(`Error getting actors ${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createActor = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/createActor`,
  async (actor, { rejectWithValue }) => {
    try {
      const { status, data } = await api.post(`/${ACTORS_SLICE_NAME}`, actor);
      if (status >= 400) throw new Error(`Error create actor ${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateActor = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/updateActor`,
  async (actor, { rejectWithValue }) => {
    try {
      const { status, data } = await api.put(
        `/${ACTORS_SLICE_NAME}/${actor.id}`,
        actor
      );
      if (status >= 400) throw new Error(`Error update actor ${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteActor = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/deleteActor`,
  async (id, { rejectWithValue }) => {
    try {
      const { status } = await api.delete(`/${ACTORS_SLICE_NAME}/${id}`);
      if (status >= 400) throw new Error(`Error delete actor ${status}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    builder.addCase(getAllActors.fulfilled, (state, { payload }) => {
      state.actors = payload;
      state.status = null;
      state.error = null;
    });
    builder.addCase(createActor.fulfilled, (state, { payload }) => {
      state.actors.push(payload);
      state.status = 'Actor created successfully!';
      state.error = null;
    });
    builder.addCase(updateActor.fulfilled, (state, { payload }) => {
      state.actors = state.actors.map((actor) =>
        actor.id === payload.id ? payload : actor
      );
      state.status = 'Actor updated successfully!';
      state.error = null;
    });
    builder.addCase(deleteActor.fulfilled, (state, { payload }) => {
      state.actors = state.actors.filter((actor) => actor.id !== payload);
      state.status = 'Actor deleted successfully!';
      state.error = null;
    });

    // Pending
    builder.addCase(getAllActors.pending, setStatus);
    builder.addCase(createActor.pending, setStatus);
    builder.addCase(updateActor.pending, setStatus);
    builder.addCase(deleteActor.pending, setStatus);

    // Error
    builder.addCase(getAllActors.rejected, setError);
    builder.addCase(createActor.rejected, setError);
    builder.addCase(updateActor.rejected, setError);
    builder.addCase(deleteActor.rejected, setError);
  },
});

export const { resetStatus } = actorsSlice.actions;

export default actorsSlice.reducer;
