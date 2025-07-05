import { createAsyncThunk } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';
import api from '../../api';

export const fetchAllActors = createAsyncThunk(
  `${SLICE_NAMES.ACTORS_SLICE_NAME}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/${SLICE_NAMES.ACTORS_SLICE_NAME}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addActor = createAsyncThunk(
  `${SLICE_NAMES.ACTORS_SLICE_NAME}/add`,
  async (actor, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/${SLICE_NAMES.ACTORS_SLICE_NAME}`,
        actor
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editActor = createAsyncThunk(
  `${SLICE_NAMES.ACTORS_SLICE_NAME}/edit`,
  async (actor, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/${SLICE_NAMES.ACTORS_SLICE_NAME}/${actor.uuid}`,
        actor
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeActor = createAsyncThunk(
  `${SLICE_NAMES.ACTORS_SLICE_NAME}/remove`,
  async (uuid, { rejectWithValue }) => {
    try {
      await api.delete(`/${SLICE_NAMES.ACTORS_SLICE_NAME}/${uuid}`);
      return uuid;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
