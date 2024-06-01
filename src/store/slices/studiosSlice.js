import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { studiosState } from '../../model/initialStates';
import { STUDIOS_SLICE_NAME } from '../../constants';
import { emptyStudio } from '../../constants';

import api from '../../api';
import { setError, setStatus } from '../../services/reducer-service';

const initialState = {
  studios: studiosState,
  currentStudio: createEmptyStudio(),
  status: null,
  error: null,
};

export const getAllStudios = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/getAllStudios`,
  async (_, { rejectWithValue }) => {
    try {
      const { status, data } = await api.get(`/${STUDIOS_SLICE_NAME}`);
      if (status >= 400) throw new Error(`Error getting studios ${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getStudioById = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/getStudioById`,
  async function (id, { rejectWithValue }) {
    try {
      const { status, data } = await api.get(
        `/${STUDIOS_SLICE_NAME}?studioId=${id}`
      );
      if (status >= 400) {
        throw new Error(`Error getting studio ${status}`);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createStudio = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/createStudio`,
  async (studio, { rejectWithValue }) => {
    try {
      const { status, data } = await api.post(`/${STUDIOS_SLICE_NAME}`, studio);
      if (status >= 400) throw new Error(`Error create studio ${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStudio = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/updateStudio`,
  async (studio, { rejectWithValue }) => {
    try {
      const { status, data } = await api.put(
        `/${STUDIOS_SLICE_NAME}/${studio.id}`,
        studio
      );
      if (status >= 400) throw new Error(`Error update studio ${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStudio = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/deleteStudio`,
  async (id, { rejectWithValue }) => {
    try {
      const { status } = await api.delete(`/${STUDIOS_SLICE_NAME}/${id}`);
      if (status >= 400) throw new Error(`Error delete studio ${status}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

function createEmptyStudio() {
  return emptyStudio;
}

const studiosSlice = createSlice({
  name: STUDIOS_SLICE_NAME,
  initialState,
  reducers: {
    selectStudio(state, { payload }) {
      state.currentStudio = payload;
    },

    addNewStudio(state) {
      state.currentStudio = createEmptyStudio();
    },
  },

  extraReducers: (builder) => {
    // Success
    builder.addCase(getAllStudios.fulfilled, (state, { payload }) => {
      state.studios = payload;
      state.currentStudio = createEmptyStudio();
      state.status = 'fulfilled';
      state.error = null;
    });
    builder.addCase(getStudioById.fulfilled, (state, { payload }) => {
      state.studios = payload;
      state.currentStudio = createEmptyStudio();
      state.status = 'fulfilled';
      state.error = null;
    });
    builder.addCase(createStudio.fulfilled, (state, { payload }) => {
      state.studios.push(payload);
      state.currentStudio = createEmptyStudio();
      state.status = 'Create studio successfuly!';
      state.error = null;
    });
    builder.addCase(updateStudio.fulfilled, (state, { payload }) => {
      state.studios = state.studios.map((studio) =>
        studio.id === payload.id ? payload : studio
      );
      state.status = 'Update studio successfuly!';
      state.error = null;
    });
    builder.addCase(deleteStudio.fulfilled, (state, { payload }) => {
      state.studios = state.studios.filter((studio) => studio.id !== payload);
      state.currentStudio = createEmptyStudio();
      state.status = 'Delete studio successfuly!';
      state.error = null;
    });

    // Pending
    builder.addCase(getAllStudios.pending, setStatus);
    builder.addCase(getStudioById.pending, setStatus);
    builder.addCase(createStudio.pending, setStatus);
    builder.addCase(updateStudio.pending, setStatus);
    builder.addCase(deleteStudio.pending, setStatus);

    // Error
    builder.addCase(getAllStudios.rejected, setError);
    builder.addCase(getStudioById.rejected, setError);
    builder.addCase(createStudio.rejected, setError);
    builder.addCase(updateStudio.rejected, setError);
    builder.addCase(deleteStudio.rejected, setError);
  },
});

const { actions, reducer } = studiosSlice;

export const { selectStudio, addNewStudio } = actions;

export default reducer;
