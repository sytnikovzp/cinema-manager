import { createAsyncThunk } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '@/src/constants';
import api from '@/src/api';

export const fetchDirectors = createAsyncThunk(
  `${SLICE_NAMES.DIRECTORS_SLICE_NAME}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/${SLICE_NAMES.DIRECTORS_SLICE_NAME}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addDirector = createAsyncThunk(
  `${SLICE_NAMES.DIRECTORS_SLICE_NAME}/add`,
  async (director, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/${SLICE_NAMES.DIRECTORS_SLICE_NAME}`,
        director
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editDirector = createAsyncThunk(
  `${SLICE_NAMES.DIRECTORS_SLICE_NAME}/edit`,
  async (director, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/${SLICE_NAMES.DIRECTORS_SLICE_NAME}/${director.uuid}`,
        director
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeDirector = createAsyncThunk(
  `${SLICE_NAMES.DIRECTORS_SLICE_NAME}/remove`,
  async (uuid, { rejectWithValue }) => {
    try {
      await api.delete(`/${SLICE_NAMES.DIRECTORS_SLICE_NAME}/${uuid}`);
      return uuid;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
