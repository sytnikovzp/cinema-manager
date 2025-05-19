const { Router } = require('express');

const {
  validation: { validateLocation },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllLocations,
  getLocationByUuid,
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
  .route('/:locationUuid')
  .get(getLocationByUuid)
  .delete(deleteLocation)
  .patch(validateLocation, updateLocation);

module.exports = locationsRouter;
