import { createAsyncThunk } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';
import api from '../../api';

export const fetchMovies = createAsyncThunk(
  `${SLICE_NAMES.MOVIES_SLICE_NAME}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/${SLICE_NAMES.MOVIES_SLICE_NAME}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addMovie = createAsyncThunk(
  `${SLICE_NAMES.MOVIES_SLICE_NAME}/add`,
  async (movie, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/${SLICE_NAMES.MOVIES_SLICE_NAME}`,
        movie
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editMovie = createAsyncThunk(
  `${SLICE_NAMES.MOVIES_SLICE_NAME}/edit`,
  async (movie, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/${SLICE_NAMES.MOVIES_SLICE_NAME}/${movie.uuid}`,
        movie
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeMovie = createAsyncThunk(
  `${SLICE_NAMES.MOVIES_SLICE_NAME}/remove`,
  async (uuid, { rejectWithValue }) => {
    try {
      await api.delete(`/${SLICE_NAMES.MOVIES_SLICE_NAME}/${uuid}`);
      return uuid;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
