import api from '../api';

const handleError = (error, defaultMessage) => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  throw new Error(errorMessage);
};

export const getAllActors = async () => {
  try {
    const response = await api.get('/actors');
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get all actors');
  }
};

export const getActorById = async (id) => {
  try {
    const response = await api.get(`/actors/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get actor by id');
  }
};

export const createActor = async (actorData) => {
  try {
    const response = await api.post('/actors', actorData);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to create actor');
  }
};

export const updateActor = async (actorData) => {
  try {
    const response = await api.put(`/actors/${actorData.id}`, actorData);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to update actor');
  }
};

export const patchActor = async (actorData) => {
  try {
    const response = await api.patch(`/actors/${actorData.id}`, actorData);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to patch actor');
  }
};

export const deleteActor = async (id) => {
  try {
    const response = await api.delete(`/actors/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to delete actor');
  }
};
