const { Router } = require('express');

const {
  validation: { validateCountry },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllCountries,
  getCountryById,
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
  .route('/:countryId')
  .get(getCountryById)
  .delete(deleteCountry)
  .patch(validateCountry, updateCountry);

module.exports = countriesRouter;
