const { Router } = require('express');
// ============================
const movieController = require('../controllers/movieController');
const {
  validateMovie,
  validatePatchMovie,
} = require('../middleware/validate.mw');
const { paginate } = require('../middleware');

// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, movieController.getMovies)
  .post(validateMovie, movieController.createMovie)
  .put(validateMovie, movieController.updateMovie);

router
  .route('/:movieId')
  .get(movieController.getMovieById)
  .delete(movieController.deleteMovie)
  .patch(validatePatchMovie, movieController.patchMovie);

module.exports = router;
