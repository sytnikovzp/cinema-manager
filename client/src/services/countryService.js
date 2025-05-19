import api from '../api';

export const getAllCountries = async () => {
  const response = await api.get(`/countries`);
  return response.data;
};

export const getCountryByUuid = async (uuid) => {
  const response = await api.get(`/countries/${uuid}`);
  return response.data;
};

export const createCountry = async (countryData) => {
  const response = await api.post(`/countries`, countryData);
  return response.data;
};

export const updateCountry = async (countryData) => {
  const response = await api.patch(
    `/countries/${countryData.uuid}`,
    countryData
  );
  return response.data;
};

export const deleteCountry = async (uuid) => {
  const response = await api.delete(`/countries/${uuid}`);
  return response.data;
};
