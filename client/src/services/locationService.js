import api from '@/src/api';

export const getAllLocations = async () => {
  const response = await api.get(`/locations`);
  return response.data;
};

export const getLocationByUuid = async (uuid) => {
  const response = await api.get(`/locations/${uuid}`);
  return response.data;
};

export const createLocation = async (locationData) => {
  const response = await api.post(`/locations`, locationData);
  return response.data;
};

export const updateLocation = async (locationData) => {
  const response = await api.patch(
    `/locations/${locationData.uuid}`,
    locationData
  );
  return response.data;
};

export const deleteLocation = async (uuid) => {
  const response = await api.delete(`/locations/${uuid}`);
  return response.data;
};
