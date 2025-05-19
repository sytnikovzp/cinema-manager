import api from '../api';

export const getAllStudios = async () => {
  const response = await api.get(`/studios`);
  return response.data;
};

export const getStudioByUuid = async (uuid) => {
  const response = await api.get(`/studios/${uuid}`);
  return response.data;
};

export const createStudio = async (studioData) => {
  const response = await api.post(`/studios`, studioData);
  return response.data;
};

export const updateStudio = async (studioData) => {
  const response = await api.patch(`/studios/${studioData.uuid}`, studioData);
  return response.data;
};

export const deleteStudio = async (uuid) => {
  const response = await api.delete(`/studios/${uuid}`);
  return response.data;
};
