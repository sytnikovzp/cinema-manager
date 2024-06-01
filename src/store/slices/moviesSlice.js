import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { moviesState } from '../../model/initialStates';
import { MOVIES_SLICE_NAME } from '../../constants';
import { emptyMovie } from '../../constants';

import api from '../../api';
import { setError, setStatus } from '../../services/reducer-service';

const initialState = {
  movies: moviesState,
  currentMovie: createEmptyMovie(),
  status: null,
  error: null,
};

export const getAllMovies = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/getAllMovies`,
  async (_, { rejectWithValue }) => {
    try {
      const { status, data } = await api.get(`/${MOVIES_SLICE_NAME}`);
      if (status >= 400) throw new Error(`Error getting movies ${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMovieById = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/getMovieById`,
  async function (id, { rejectWithValue }) {
    try {
      const { status, data } = await api.get(
        `/${MOVIES_SLICE_NAME}?movieId=${id}`
      );
      if (status >= 400) {
        throw new Error(`Error getting movie ${status}`);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createMovie = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/createMovie`,
  async (movie, { rejectWithValue }) => {
    try {
      const { status, data } = await api.post(`/${MOVIES_SLICE_NAME}`, movie);
      if (status >= 400) throw new Error(`Error create movie ${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMovie = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/updateMovie`,
  async (movie, { rejectWithValue }) => {
    try {
      const { status, data } = await api.put(
        `/${MOVIES_SLICE_NAME}/${movie.id}`,
        movie
      );
      if (status >= 400) throw new Error(`Error update movie ${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/deleteMovie`,
  async (id, { rejectWithValue }) => {
    try {
      const { status } = await api.delete(`/${MOVIES_SLICE_NAME}/${id}`);
      if (status >= 400) throw new Error(`Error delete movie ${status}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

function createEmptyMovie() {
  return emptyMovie;
}

const moviesSlice = createSlice({
  name: MOVIES_SLICE_NAME,
  initialState,
  reducers: {
    selectMovie(state, { payload }) {
      state.currentMovie = payload;
    },

    addNewMovie(state) {
      state.currentMovie = createEmptyMovie();
    },
  },

  extraReducers: (builder) => {
    // Success
    builder.addCase(getAllMovies.fulfilled, (state, { payload }) => {
      state.movies = payload;
      state.currentMovie = createEmptyMovie();
      state.status = 'fulfilled';
      state.error = null;
    });
    builder.addCase(getMovieById.fulfilled, (state, { payload }) => {
      state.movies = payload;
      state.currentMovie = createEmptyMovie();
      state.status = 'fulfilled';
      state.error = null;
    });
    builder.addCase(createMovie.fulfilled, (state, { payload }) => {
      state.movies.push(payload);
      state.currentMovie = createEmptyMovie();
      state.status = 'Create movie successfuly!';
      state.error = null;
    });
    builder.addCase(updateMovie.fulfilled, (state, { payload }) => {
      state.movies = state.movies.map((movie) =>
        movie.id === payload.id ? payload : movie
      );
      state.status = 'Update movie successfuly!';
      state.error = null;
    });
    builder.addCase(deleteMovie.fulfilled, (state, { payload }) => {
      state.movies = state.movies.filter((movie) => movie.id !== payload);
      state.currentMovie = createEmptyMovie();
      state.status = 'Delete movie successfuly!';
      state.error = null;
    });

    // Pending
    builder.addCase(getAllMovies.pending, setStatus);
    builder.addCase(getMovieById.pending, setStatus);
    builder.addCase(createMovie.pending, setStatus);
    builder.addCase(updateMovie.pending, setStatus);
    builder.addCase(deleteMovie.pending, setStatus);

    // Error
    builder.addCase(getAllMovies.rejected, setError);
    builder.addCase(getMovieById.rejected, setError);
    builder.addCase(createMovie.rejected, setError);
    builder.addCase(updateMovie.rejected, setError);
    builder.addCase(deleteMovie.rejected, setError);
  },
});

const { actions, reducer } = moviesSlice;

export const { selectMovie, addNewMovie } = actions;

export default reducer;
