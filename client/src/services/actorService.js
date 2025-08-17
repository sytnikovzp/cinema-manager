import api from '@/src/api';

export const getAllActors = async () => {
  const response = await api.get(`/actors`);
  return response.data;
};

export const getActorByUuid = async (uuid) => {
  const response = await api.get(`/actors/${uuid}`);
  return response.data;
};

export const createActor = async (actorData) => {
  const response = await api.post(`/actors`, actorData);
  return response.data;
};

export const updateActor = async (actorData) => {
  const response = await api.patch(`/actors/${actorData.uuid}`, actorData);
  return response.data;
};

export const deleteActor = async (uuid) => {
  const response = await api.delete(`/actors/${uuid}`);
  return response.data;
};
