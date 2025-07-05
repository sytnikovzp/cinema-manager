import { createAsyncThunk } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';
import api from '../../api';

export const fetchStudios = createAsyncThunk(
  `${SLICE_NAMES.STUDIOS_SLICE_NAME}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/${SLICE_NAMES.STUDIOS_SLICE_NAME}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addStudio = createAsyncThunk(
  `${SLICE_NAMES.STUDIOS_SLICE_NAME}/add`,
  async (studio, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/${SLICE_NAMES.STUDIOS_SLICE_NAME}`,
        studio
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editStudio = createAsyncThunk(
  `${SLICE_NAMES.STUDIOS_SLICE_NAME}/edit`,
  async (studio, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/${SLICE_NAMES.STUDIOS_SLICE_NAME}/${studio.uuid}`,
        studio
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeStudio = createAsyncThunk(
  `${SLICE_NAMES.STUDIOS_SLICE_NAME}/remove`,
  async (uuid, { rejectWithValue }) => {
    try {
      await api.delete(`/${SLICE_NAMES.STUDIOS_SLICE_NAME}/${uuid}`);
      return uuid;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
