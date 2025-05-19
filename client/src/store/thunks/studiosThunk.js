import { createAsyncThunk } from '@reduxjs/toolkit';

import { STUDIOS_SLICE_NAME } from '../../constants';
import api from '../../api';

export const fetchStudios = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/${STUDIOS_SLICE_NAME}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addStudio = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/add`,
  async (studio, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/${STUDIOS_SLICE_NAME}`, studio);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editStudio = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/edit`,
  async (studio, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/${STUDIOS_SLICE_NAME}/${studio.uuid}`,
        studio
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeStudio = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/remove`,
  async (uuid, { rejectWithValue }) => {
    try {
      await api.delete(`/${STUDIOS_SLICE_NAME}/${uuid}`);
      return uuid;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
