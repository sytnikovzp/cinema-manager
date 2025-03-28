const { Router } = require('express');
// ============================
const countryController = require('../controllers/countryController');
const {
  validateCountry,
  validatePatchCountry,
} = require('../middleware/validate.mw');
const { paginate } = require('../middleware');

// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, countryController.getCountries)
  .post(validateCountry, countryController.createCountry)
  .put(validateCountry, countryController.updateCountry);

router
  .route('/:countryId')
  .get(countryController.getCountryById)
  .delete(countryController.deleteCountry)
  .patch(validatePatchCountry, countryController.patchCountry);

module.exports = router;
