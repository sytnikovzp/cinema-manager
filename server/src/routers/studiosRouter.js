const { Router } = require('express');

const {
  validation: { validateStudio, validatePatchStudio },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllStudios,
  createStudio,
  updateStudio,
  getStudioById,
  deleteStudio,
  patchStudio,
} = require('../controllers/studiosController');

const studiosRouter = new Router();

studiosRouter
  .route('/')
  .get(paginateElements, getAllStudios)
  .post(validateStudio, createStudio)
  .put(validateStudio, updateStudio);

studiosRouter
  .route('/:studioId')
  .get(getStudioById)
  .delete(deleteStudio)
  .patch(validatePatchStudio, patchStudio);

module.exports = studiosRouter;
