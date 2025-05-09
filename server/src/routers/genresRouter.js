const { Router } = require('express');

const {
  validation: { validateGenre, validatePatchGenre },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllGenres,
  createGenre,
  updateGenre,
  getGenreById,
  deleteGenre,
  patchGenre,
} = require('../controllers/genresController');

const genresRouter = new Router();

genresRouter
  .route('/')
  .get(paginateElements, getAllGenres)
  .post(validateGenre, createGenre)
  .put(validateGenre, updateGenre);

genresRouter
  .route('/:genreId')
  .get(getGenreById)
  .delete(deleteGenre)
  .patch(validatePatchGenre, patchGenre);

module.exports = genresRouter;
