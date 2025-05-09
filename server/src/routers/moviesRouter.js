const { Router } = require('express');

const {
  validation: { validateMovie, validatePatchMovie },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllMovies,
  createMovie,
  updateMovie,
  getMovieById,
  deleteMovie,
  patchMovie,
} = require('../controllers/moviesController');

const moviesRouter = new Router();

moviesRouter
  .route('/')
  .get(paginateElements, getAllMovies)
  .post(validateMovie, createMovie)
  .put(validateMovie, updateMovie);

moviesRouter
  .route('/:movieId')
  .get(getMovieById)
  .delete(deleteMovie)
  .patch(validatePatchMovie, patchMovie);

module.exports = moviesRouter;
