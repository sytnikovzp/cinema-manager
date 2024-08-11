import api from '../api';
// =============================================
import { GENRES_ENTITY_NAME } from '../constants';

const handleError = (error, defaultMessage) => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  throw new Error(errorMessage);
};

export const getAllGenres = async () => {
  try {
    const response = await api.get(`/${GENRES_ENTITY_NAME}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get all genres!');
  }
};

export const getGenreById = async (id) => {
  try {
    const response = await api.get(`/${GENRES_ENTITY_NAME}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get genre information!');
  }
};

export const createGenre = async (genreData) => {
  try {
    const response = await api.post(`/${GENRES_ENTITY_NAME}`, genreData);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to create genre!');
  }
};

export const patchGenre = async (genreData) => {
  try {
    const response = await api.patch(
      `/${GENRES_ENTITY_NAME}/${genreData.id}`,
      genreData
    );
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to update genre!');
  }
};

export const deleteGenre = async (id) => {
  try {
    const response = await api.delete(`/${GENRES_ENTITY_NAME}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to delete genre!');
  }
};
