const { Router } = require('express');

const {
  validation: { validatePerson, validatePatchPerson },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllDirectors,
  createDirector,
  updateDirector,
  getDirectorById,
  deleteDirector,
  patchDirector,
} = require('../controllers/directorsController');

const directorsRouter = new Router();

directorsRouter
  .route('/')
  .get(paginateElements, getAllDirectors)
  .post(validatePerson, createDirector)
  .put(validatePerson, updateDirector);

directorsRouter
  .route('/:directorId')
  .get(getDirectorById)
  .delete(deleteDirector)
  .patch(validatePatchPerson, patchDirector);

module.exports = directorsRouter;
