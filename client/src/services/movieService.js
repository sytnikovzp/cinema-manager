import api from '../api';
// =============================================
import { MOVIES_ENTITY_NAME } from '../constants';

const handleError = (error, defaultMessage) => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  throw new Error(errorMessage);
};

export const getAllMovies = async () => {
  try {
    const response = await api.get(`/${MOVIES_ENTITY_NAME}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get all movies!');
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await api.get(`/${MOVIES_ENTITY_NAME}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get movie information!');
  }
};

export const createMovie = async (movieData) => {
  try {
    const response = await api.post(`/${MOVIES_ENTITY_NAME}`, movieData);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to create movie!');
  }
};

export const patchMovie = async (movieData) => {
  try {
    const response = await api.patch(
      `/${MOVIES_ENTITY_NAME}/${movieData.id}`,
      movieData
    );
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to update movie!');
  }
};

export const deleteMovie = async (id) => {
  try {
    const response = await api.delete(`/${MOVIES_ENTITY_NAME}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to delete movie!');
  }
};
