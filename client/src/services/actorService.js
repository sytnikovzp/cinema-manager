import api from '../api';

export const getAllActors = async () => {
  const response = await api.get(`/actors`);
  return response.data;
};

export const getActorById = async (id) => {
  const response = await api.get(`/actors/${id}`);
  return response.data;
};

export const createActor = async (actorData) => {
  const response = await api.post(`/actors`, actorData);
  return response.data;
};

export const updateActor = async (actorData) => {
  const response = await api.patch(`/actors/${actorData.id}`, actorData);
  return response.data;
};

export const deleteActor = async (id) => {
  const response = await api.delete(`/actors/${id}`);
  return response.data;
};
