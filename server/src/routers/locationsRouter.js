const { Router } = require('express');

const {
  validation: { validateLocation, validatePatchLocation },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllLocations,
  createLocation,
  updateLocation,
  getLocationById,
  deleteLocation,
  patchLocation,
} = require('../controllers/locationsController');

const locationsRouter = new Router();

locationsRouter
  .route('/')
  .get(paginateElements, getAllLocations)
  .post(validateLocation, createLocation)
  .put(validateLocation, updateLocation);

locationsRouter
  .route('/:locationId')
  .get(getLocationById)
  .delete(deleteLocation)
  .patch(validatePatchLocation, patchLocation);

module.exports = locationsRouter;
