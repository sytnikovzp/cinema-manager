import api from '../api';
// =============================================
import { STUDIOS_ENTITY_NAME } from '../constants';

const handleError = (error, defaultMessage) => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  throw new Error(errorMessage);
};

export const getAllStudios = async () => {
  try {
    const response = await api.get(`/${STUDIOS_ENTITY_NAME}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get all studios!');
  }
};

export const getStudioById = async (id) => {
  try {
    const response = await api.get(`/${STUDIOS_ENTITY_NAME}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get studio information!');
  }
};

export const createStudio = async (studioData) => {
  try {
    const response = await api.post(`/${STUDIOS_ENTITY_NAME}`, studioData);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to create studio!');
  }
};

export const patchStudio = async (studioData) => {
  try {
    const response = await api.patch(
      `/${STUDIOS_ENTITY_NAME}/${studioData.id}`,
      studioData
    );
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to update studio!');
  }
};

export const deleteStudio = async (id) => {
  try {
    const response = await api.delete(`/${STUDIOS_ENTITY_NAME}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to delete studio!');
  }
};
