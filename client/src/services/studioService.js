import api from '../api';

export const getAllStudios = async () => {
  const response = await api.get(`/studios`);
  return response.data;
};

export const getStudioById = async (id) => {
  const response = await api.get(`/studios/${id}`);
  return response.data;
};

export const createStudio = async (studioData) => {
  const response = await api.post(`/studios`, studioData);
  return response.data;
};

export const updateStudio = async (studioData) => {
  const response = await api.patch(`/studios/${studioData.id}`, studioData);
  return response.data;
};

export const deleteStudio = async (id) => {
  const response = await api.delete(`/studios/${id}`);
  return response.data;
};
