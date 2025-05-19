import { createAsyncThunk } from '@reduxjs/toolkit';

import { ACTORS_SLICE_NAME } from '../../constants';
import api from '../../api';

export const fetchAllActors = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/${ACTORS_SLICE_NAME}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addActor = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/add`,
  async (actor, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/${ACTORS_SLICE_NAME}`, actor);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editActor = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/edit`,
  async (actor, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/${ACTORS_SLICE_NAME}/${actor.uuid}`,
        actor
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeActor = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/remove`,
  async (uuid, { rejectWithValue }) => {
    try {
      await api.delete(`/${ACTORS_SLICE_NAME}/${uuid}`);
      return uuid;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
