const { Router } = require('express');

const {
  validation: { validateCountry, validatePatchCountry },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllCountries,
  createCountry,
  updateCountry,
  getCountryById,
  deleteCountry,
  patchCountry,
} = require('../controllers/countriesController');

const countriesRouter = new Router();

countriesRouter
  .route('/')
  .get(paginateElements, getAllCountries)
  .post(validateCountry, createCountry)
  .put(validateCountry, updateCountry);

countriesRouter
  .route('/:countryId')
  .get(getCountryById)
  .delete(deleteCountry)
  .patch(validatePatchCountry, patchCountry);

module.exports = countriesRouter;
