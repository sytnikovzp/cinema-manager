import api from '@/src/api';

export const getAllMovies = async () => {
  const response = await api.get(`/movies`);
  return response.data;
};

export const getMovieByUuid = async (uuid) => {
  const response = await api.get(`/movies/${uuid}`);
  return response.data;
};

export const createMovie = async (movieData) => {
  const response = await api.post(`/movies`, movieData);
  return response.data;
};

export const updateMovie = async (movieData) => {
  const response = await api.patch(`/movies/${movieData.uuid}`, movieData);
  return response.data;
};

export const deleteMovie = async (uuid) => {
  const response = await api.delete(`/movies/${uuid}`);
  return response.data;
};
