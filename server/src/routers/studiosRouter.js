const { Router } = require('express');

const {
  validation: { validateStudio },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllStudios,
  getStudioById,
  createStudio,
  updateStudio,
  deleteStudio,
} = require('../controllers/studiosController');

const studiosRouter = new Router();

studiosRouter
  .route('/')
  .get(paginateElements, getAllStudios)
  .post(validateStudio, createStudio);

studiosRouter
  .route('/:studioId')
  .get(getStudioById)
  .delete(deleteStudio)
  .patch(validateStudio, updateStudio);

module.exports = studiosRouter;
