import api from '../api';
// =============================================
import { COUNTRIES_ENTITY_NAME } from '../constants';

const handleError = (error, defaultMessage) => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  throw new Error(errorMessage);
};

export const getAllCountries = async () => {
  try {
    const response = await api.get(`/${COUNTRIES_ENTITY_NAME}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get all countries!');
  }
};

export const getCountryById = async (id) => {
  try {
    const response = await api.get(`/${COUNTRIES_ENTITY_NAME}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get country information!');
  }
};

export const createCountry = async (countryData) => {
  try {
    const response = await api.post(`/${COUNTRIES_ENTITY_NAME}`, countryData);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to create country!');
  }
};

export const patchCountry = async (countryData) => {
  try {
    const response = await api.patch(
      `/${COUNTRIES_ENTITY_NAME}/${countryData.id}`,
      countryData
    );
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to update country!');
  }
};

export const deleteCountry = async (id) => {
  try {
    const response = await api.delete(`/${COUNTRIES_ENTITY_NAME}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to delete country!');
  }
};
