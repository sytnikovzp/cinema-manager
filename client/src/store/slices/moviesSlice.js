import { createSlice } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '@/src/constants';
import { setErrorState, setFetchingState } from '@/src/utils/reduxHelpers';

import {
  addMovie,
  editMovie,
  fetchMovies,
  removeMovie,
} from '@/src/store/thunks/moviesThunk';

const moviesState = [
  {
    uuid: null,
    title: '',
    genre: '',
    releaseYear: '',
    poster: '',
    trailer: '',
    directors: [''],
    actors: [''],
    studios: [''],
    storyline: '',
  },
];

const initialState = {
  movies: moviesState,
  status: null,
  error: null,
};

const moviesSlice = createSlice({
  name: SLICE_NAMES.MOVIES_SLICE_NAME,
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = null;
    },
  },

  extraReducers: (builder) => {
    // Success
    builder.addCase(fetchMovies.fulfilled, (state, { payload }) => {
      state.movies = payload;
      state.status = null;
      state.error = null;
    });
    builder.addCase(addMovie.fulfilled, (state, { payload }) => {
      state.movies.push(payload);
      state.status = 'Movie created successfully!';
      state.error = null;
    });
    builder.addCase(editMovie.fulfilled, (state, { payload }) => {
      state.movies = state.movies.map((movie) =>
        (movie.uuid === payload.uuid ? payload : movie)
      );
      state.status = 'Movie updated successfully!';
      state.error = null;
    });
    builder.addCase(removeMovie.fulfilled, (state, { payload }) => {
      state.movies = state.movies.filter((movie) => movie.uuid !== payload);
      state.status = 'Movie deleted successfully!';
      state.error = null;
    });

    // Pending
    builder.addCase(fetchMovies.pending, setFetchingState);
    builder.addCase(addMovie.pending, setFetchingState);
    builder.addCase(editMovie.pending, setFetchingState);
    builder.addCase(removeMovie.pending, setFetchingState);

    // Error
    builder.addCase(fetchMovies.rejected, setErrorState);
    builder.addCase(addMovie.rejected, (state, { payload }) => {
      state.status = 'Failed to create movie!';
      state.error = payload;
    });
    builder.addCase(editMovie.rejected, (state, { payload }) => {
      state.status = 'Failed to update movie!';
      state.error = payload;
    });
    builder.addCase(removeMovie.rejected, (state, { payload }) => {
      state.status = 'Failed to delete movie!';
      state.error = payload;
    });
  },
});

export const { resetStatus } = moviesSlice.actions;

export default moviesSlice.reducer;
