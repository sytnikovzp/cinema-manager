const { Router } = require('express');

const {
  validation: { validateMovie },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllMovies,
  getMovieByUuid,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/moviesController');

const moviesRouter = new Router();

moviesRouter
  .route('/')
  .get(paginateElements, getAllMovies)
  .post(validateMovie, createMovie);

moviesRouter
  .route('/:movieUuid')
  .get(getMovieByUuid)
  .delete(deleteMovie)
  .patch(validateMovie, updateMovie);

module.exports = moviesRouter;
