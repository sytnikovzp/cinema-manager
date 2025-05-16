const { Router } = require('express');

const {
  validation: { validatePerson },
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
  .patch(validatePerson, updateDirector);

module.exports = directorsRouter;
