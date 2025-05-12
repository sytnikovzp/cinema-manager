const { Router } = require('express');

const {
  validation: { validateGenre, validatePatchGenre },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} = require('../controllers/genresController');

const genresRouter = new Router();

genresRouter
  .route('/')
  .get(paginateElements, getAllGenres)
  .post(validateGenre, createGenre);

genresRouter
  .route('/:genreId')
  .get(getGenreById)
  .delete(deleteGenre)
  .patch(validatePatchGenre, updateGenre);

module.exports = genresRouter;
