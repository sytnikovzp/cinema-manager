const { Router } = require('express');

const {
  validation: { validateLocation, validatePatchLocation },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/locationsController');

const locationsRouter = new Router();

locationsRouter
  .route('/')
  .get(paginateElements, getAllLocations)
  .post(validateLocation, createLocation);

locationsRouter
  .route('/:locationId')
  .get(getLocationById)
  .delete(deleteLocation)
  .patch(validatePatchLocation, updateLocation);

module.exports = locationsRouter;
