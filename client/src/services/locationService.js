import api from '../api';
// =============================================
import { LOCATIONS_ENTITY_NAME } from '../constants';

const handleError = (error, defaultMessage) => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  throw new Error(errorMessage);
};

export const getAllLocations = async () => {
  try {
    const response = await api.get(`/${LOCATIONS_ENTITY_NAME}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get all locations!');
  }
};

export const getLocationById = async (id) => {
  try {
    const response = await api.get(`/${LOCATIONS_ENTITY_NAME}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get location information!');
  }
};

export const createLocation = async (locationData) => {
  try {
    const response = await api.post(`/${LOCATIONS_ENTITY_NAME}`, locationData);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to create location!');
  }
};

export const patchLocation = async (locationData) => {
  try {
    const response = await api.patch(
      `/${LOCATIONS_ENTITY_NAME}/${locationData.id}`,
      locationData
    );
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to update location!');
  }
};

export const deleteLocation = async (id) => {
  try {
    const response = await api.delete(`/${LOCATIONS_ENTITY_NAME}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to delete location!');
  }
};
