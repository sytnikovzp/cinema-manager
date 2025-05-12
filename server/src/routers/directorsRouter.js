const { Router } = require('express');

const {
  validation: { validatePerson, validatePatchPerson },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
} = require('../controllers/directorsController');

const directorsRouter = new Router();

directorsRouter
  .route('/')
  .get(paginateElements, getAllDirectors)
  .post(validatePerson, createDirector);

directorsRouter
  .route('/:directorId')
  .get(getDirectorById)
  .delete(deleteDirector)
  .patch(validatePatchPerson, updateDirector);

module.exports = directorsRouter;
