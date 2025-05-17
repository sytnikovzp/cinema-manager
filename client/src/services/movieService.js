import api from '../api';

export const getAllMovies = async () => {
  const response = await api.get(`/movies`);
  return response.data;
};

export const getMovieById = async (id) => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};

export const createMovie = async (movieData) => {
  const response = await api.post(`/movies`, movieData);
  return response.data;
};

export const updateMovie = async (movieData) => {
  const response = await api.patch(`/movies/${movieData.id}`, movieData);
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await api.delete(`/movies/${id}`);
  return response.data;
};
