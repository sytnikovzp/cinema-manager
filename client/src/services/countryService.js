import api from '../api';

export const getAllCountries = async () => {
  const response = await api.get(`/countries`);
  return response.data;
};

export const getCountryById = async (id) => {
  const response = await api.get(`/countries/${id}`);
  return response.data;
};

export const createCountry = async (countryData) => {
  const response = await api.post(`/countries`, countryData);
  return response.data;
};

export const updateCountry = async (countryData) => {
  const response = await api.patch(`/countries/${countryData.id}`, countryData);
  return response.data;
};

export const deleteCountry = async (id) => {
  const response = await api.delete(`/countries/${id}`);
  return response.data;
};
