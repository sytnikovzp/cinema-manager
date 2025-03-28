import api from '../api';
// =============================================
import { ACTORS_ENTITY_NAME } from '../constants';

const handleError = (error, defaultMessage) => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  throw new Error(errorMessage);
};

export const getAllActors = async () => {
  try {
    const response = await api.get(`/${ACTORS_ENTITY_NAME}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get all actors!');
  }
};

export const getActorById = async (id) => {
  try {
    const response = await api.get(`/${ACTORS_ENTITY_NAME}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to get actor information!');
  }
};

export const createActor = async (actorData) => {
  try {
    const response = await api.post(`/${ACTORS_ENTITY_NAME}`, actorData);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to create actor!');
  }
};

export const patchActor = async (actorData) => {
  try {
    const response = await api.patch(
      `/${ACTORS_ENTITY_NAME}/${actorData.id}`,
      actorData
    );
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to update actor!');
  }
};

export const deleteActor = async (id) => {
  try {
    const response = await api.delete(`/${ACTORS_ENTITY_NAME}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to delete actor!');
  }
};
