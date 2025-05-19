const { Router } = require('express');

const {
  validation: { validateGenre },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllGenres,
  getGenreByUuid,
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
  .route('/:genreUuid')
  .get(getGenreByUuid)
  .delete(deleteGenre)
  .patch(validateGenre, updateGenre);

module.exports = genresRouter;
