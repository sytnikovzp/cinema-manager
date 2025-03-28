const { Router } = require('express');
// ============================
const studioController = require('../controllers/studioController');
const {
  validateStudio,
  validatePatchStudio,
} = require('../middleware/validate.mw');
const { paginate } = require('../middleware');

// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, studioController.getStudios)
  .post(validateStudio, studioController.createStudio)
  .put(validateStudio, studioController.updateStudio);

router
  .route('/:studioId')
  .get(studioController.getStudioById)
  .delete(studioController.deleteStudio)
  .patch(validatePatchStudio, studioController.patchStudio);

module.exports = router;
