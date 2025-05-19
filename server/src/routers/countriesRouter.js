const { Router } = require('express');

const {
  validation: { validateCountry },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllCountries,
  getCountryByUuid,
  createCountry,
  updateCountry,
  deleteCountry,
} = require('../controllers/countriesController');

const countriesRouter = new Router();

countriesRouter
  .route('/')
  .get(paginateElements, getAllCountries)
  .post(validateCountry, createCountry);

countriesRouter
  .route('/:countryUuid')
  .get(getCountryByUuid)
  .delete(deleteCountry)
  .patch(validateCountry, updateCountry);

module.exports = countriesRouter;
