const { Router } = require('express');

const {
  validation: { validateMovie, validatePatchMovie },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllMovies,
  getMovieById,
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
  .route('/:movieId')
  .get(getMovieById)
  .delete(deleteMovie)
  .patch(validatePatchMovie, updateMovie);

module.exports = moviesRouter;
