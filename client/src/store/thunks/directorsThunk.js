import { createAsyncThunk } from '@reduxjs/toolkit';

import { DIRECTORS_SLICE_NAME } from '../../constants';
import api from '../../api';

export const fetchDirectors = createAsyncThunk(
  `${DIRECTORS_SLICE_NAME}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/${DIRECTORS_SLICE_NAME}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addDirector = createAsyncThunk(
  `${DIRECTORS_SLICE_NAME}/add`,
  async (director, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/${DIRECTORS_SLICE_NAME}`, director);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editDirector = createAsyncThunk(
  `${DIRECTORS_SLICE_NAME}/edit`,
  async (director, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/${DIRECTORS_SLICE_NAME}/${director.id}`,
        director
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeDirector = createAsyncThunk(
  `${DIRECTORS_SLICE_NAME}/remove`,
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/${DIRECTORS_SLICE_NAME}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
