import { createAsyncThunk } from '@reduxjs/toolkit';

import { MOVIES_SLICE_NAME } from '../../constants';
import api from '../../api';

export const fetchMovies = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/${MOVIES_SLICE_NAME}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addMovie = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/add`,
  async (movie, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/${MOVIES_SLICE_NAME}`, movie);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editMovie = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/edit`,
  async (movie, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/${MOVIES_SLICE_NAME}/${movie.uuid}`,
        movie
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeMovie = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/remove`,
  async (uuid, { rejectWithValue }) => {
    try {
      await api.delete(`/${MOVIES_SLICE_NAME}/${uuid}`);
      return uuid;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
