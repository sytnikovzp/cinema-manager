import api from '../api';

export const getAllLocations = async () => {
  const response = await api.get(`/locations`);
  return response.data;
};

export const getLocationById = async (id) => {
  const response = await api.get(`/locations/${id}`);
  return response.data;
};

export const createLocation = async (locationData) => {
  const response = await api.post(`/locations`, locationData);
  return response.data;
};

export const updateLocation = async (locationData) => {
  const response = await api.patch(
    `/locations/${locationData.id}`,
    locationData
  );
  return response.data;
};

export const deleteLocation = async (id) => {
  const response = await api.delete(`/locations/${id}`);
  return response.data;
};
