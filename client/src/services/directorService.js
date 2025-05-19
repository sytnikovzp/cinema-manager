import api from '../api';

export const getAllDirectors = async () => {
  const response = await api.get(`/directors`);
  return response.data;
};

export const getDirectorByUuid = async (uuid) => {
  const response = await api.get(`/directors/${uuid}`);
  return response.data;
};

export const createDirector = async (directorData) => {
  const response = await api.post(`/directors`, directorData);
  return response.data;
};

export const updateDirector = async (directorData) => {
  const response = await api.patch(
    `/directors/${directorData.uuid}`,
    directorData
  );
  return response.data;
};

export const deleteDirector = async (uuid) => {
  const response = await api.delete(`/directors/${uuid}`);
  return response.data;
};
