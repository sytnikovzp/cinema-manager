import api from '../api';
// =============================================
import { DIRECTORS_ENTITY_NAME } from '../constants';

const handleError = (error, defaultMessage) => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  throw new Error(errorMessage);
};

export const getAllDirectors = async () => {
  try {
    const response = await api.get(`/${DIRECTORS_ENTITY_NAME}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get all directors!');
  }
};

export const getDirectorById = async (id) => {
  try {
    const response = await api.get(`/${DIRECTORS_ENTITY_NAME}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get director information!');
  }
};

export const createDirector = async (directorData) => {
  try {
    const response = await api.post(`/${DIRECTORS_ENTITY_NAME}`, directorData);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to create director!');
  }
};

export const patchDirector = async (directorData) => {
  try {
    const response = await api.patch(
      `/${DIRECTORS_ENTITY_NAME}/${directorData.id}`,
      directorData
    );
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to update director!');
  }
};

export const deleteDirector = async (id) => {
  try {
    const response = await api.delete(`/${DIRECTORS_ENTITY_NAME}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to delete director!');
  }
};
