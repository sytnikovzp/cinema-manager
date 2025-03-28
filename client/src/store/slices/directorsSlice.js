import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// =============================================
import { directorsState } from '../../model/initialStates';
import { DIRECTORS_ENTITY_NAME } from '../../constants';
// =============================================
import api from '../../api';
import { setError, setLoading } from '../../services/reducerService';

const initialState = {
  directors: directorsState,
  status: null,
  error: null,
};

export const getAllDirectors = createAsyncThunk(
  `${DIRECTORS_ENTITY_NAME}/getAllDirectors`,
  async (_, { rejectWithValue }) => {
    try {
      const { status, data } = await api.get(`/${DIRECTORS_ENTITY_NAME}`);
      if (status >= 400) throw new Error(`Error getting directors ${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createDirector = createAsyncThunk(
  `${DIRECTORS_ENTITY_NAME}/createDirector`,
  async (director, { rejectWithValue }) => {
    try {
      const { status, data } = await api.post(
        `/${DIRECTORS_ENTITY_NAME}`,
        director
      );
      if (status >= 400) throw new Error(`Error create director ${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDirector = createAsyncThunk(
  `${DIRECTORS_ENTITY_NAME}/updateDirector`,
  async (director, { rejectWithValue }) => {
    try {
      const { status, data } = await api.put(
        `/${DIRECTORS_ENTITY_NAME}/${director.id}`,
        director
      );
      if (status >= 400) throw new Error(`Error update director ${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDirector = createAsyncThunk(
  `${DIRECTORS_ENTITY_NAME}/deleteDirector`,
  async (id, { rejectWithValue }) => {
    try {
      const { status } = await api.delete(`/${DIRECTORS_ENTITY_NAME}/${id}`);
      if (status >= 400) throw new Error(`Error delete director ${status}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const directorsSlice = createSlice({
  name: DIRECTORS_ENTITY_NAME,
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = null;
    },
  },

  extraReducers: (builder) => {
    // Success
    builder.addCase(getAllDirectors.fulfilled, (state, { payload }) => {
      state.directors = payload;
      state.status = null;
      state.error = null;
    });
    builder.addCase(createDirector.fulfilled, (state, { payload }) => {
      state.directors.push(payload);
      state.status = 'Director created successfully!';
      state.error = null;
    });
    builder.addCase(updateDirector.fulfilled, (state, { payload }) => {
      state.directors = state.directors.map((director) =>
        director.id === payload.id ? payload : director
      );
      state.status = 'Director updated successfully!';
      state.error = null;
    });
    builder.addCase(deleteDirector.fulfilled, (state, { payload }) => {
      state.directors = state.directors.filter(
        (director) => director.id !== payload
      );
      state.status = 'Director deleted successfully!';
      state.error = null;
    });

    // Pending
    builder.addCase(getAllDirectors.pending, setLoading);
    builder.addCase(createDirector.pending, setLoading);
    builder.addCase(updateDirector.pending, setLoading);
    builder.addCase(deleteDirector.pending, setLoading);

    // Error
    builder.addCase(getAllDirectors.rejected, setError);
    builder.addCase(createDirector.rejected, (state, { payload }) => {
      state.status = 'Failed to create director!';
      state.error = payload;
    });
    builder.addCase(updateDirector.rejected, (state, { payload }) => {
      state.status = 'Failed to update director!';
      state.error = payload;
    });
    builder.addCase(deleteDirector.rejected, (state, { payload }) => {
      state.status = 'Failed to delete director!';
      state.error = payload;
    });
  },
});

export const { resetStatus } = directorsSlice.actions;

export default directorsSlice.reducer;
