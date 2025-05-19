import api from '../api';

export const getAllGenres = async () => {
  const response = await api.get(`/genres`);
  return response.data;
};

export const getGenreByUuid = async (uuid) => {
  const response = await api.get(`/genres/${uuid}`);
  return response.data;
};

export const createGenre = async (genreData) => {
  const response = await api.post(`/genres`, genreData);
  return response.data;
};

export const updateGenre = async (genreData) => {
  const response = await api.patch(`/genres/${genreData.uuid}`, genreData);
  return response.data;
};

export const deleteGenre = async (uuid) => {
  const response = await api.delete(`/genres/${uuid}`);
  return response.data;
};
