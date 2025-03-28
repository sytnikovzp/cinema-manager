const { Router } = require('express');
// ============================
const directorController = require('../controllers/directorController');
const {
  validatePerson,
  validatePatchPerson,
} = require('../middleware/validate.mw');
const { paginate } = require('../middleware');

// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, directorController.getDirectors)
  .post(validatePerson, directorController.createDirector)
  .put(validatePerson, directorController.updateDirector);

router
  .route('/:directorId')
  .get(directorController.getDirectorById)
  .delete(directorController.deleteDirector)
  .patch(validatePatchPerson, directorController.patchDirector);

module.exports = router;
