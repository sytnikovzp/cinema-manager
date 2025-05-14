const { sequelize } = require('../db/models');

const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../services/moviesService');

class MoviesController {
  static async getAllMovies(req, res, next) {
    try {
      const {
        pagination: { limit, offset },
      } = req;
      const { allMovies, totalCount } = await getAllMovies(limit, offset);
      if (allMovies.length > 0) {
        res.status(200).set('X-Total-Count', totalCount).json(allMovies);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get all movies error: ', error.message);
      next(error);
    }
  }

  static async getMovieById(req, res, next) {
    try {
      const {
        params: { movieId },
      } = req;
      const movieById = await getMovieById(movieId);
      if (movieById) {
        res.status(200).json(movieById);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get movie by ID error: ', error.message);
      next(error);
    }
  }

  static async createMovie(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: {
          title,
          genre,
          releaseYear,
          poster,
          trailer,
          storyline,
          studios,
          directors,
          actors,
        },
      } = req;
      const newMovie = await createMovie(
        title,
        genre,
        releaseYear,
        poster,
        trailer,
        storyline,
        studios,
        directors,
        actors,
        transaction
      );
      if (newMovie) {
        await transaction.commit();
        res.status(201).json(newMovie);
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Create movie error: ', error.message);
      next(error);
    }
  }

  static async updateMovie(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { movieId },
        body: {
          title,
          genre,
          releaseYear,
          poster,
          trailer,
          storyline,
          studios,
          directors,
          actors,
        },
      } = req;
      const updatedMovie = await updateMovie(
        movieId,
        title,
        genre,
        releaseYear,
        poster,
        trailer,
        storyline,
        studios,
        directors,
        actors,
        transaction
      );
      if (updatedMovie) {
        await transaction.commit();
        res.status(200).json(updatedMovie);
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Update movie error: ', error.message);
      next(error);
    }
  }

  static async deleteMovie(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { movieId },
      } = req;
      const deletedMovie = await deleteMovie(movieId, transaction);
      if (deletedMovie) {
        await transaction.commit();
        res.status(200).json('OK');
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Delete movie error: ', error.message);
      next(error);
    }
  }
}

module.exports = MoviesController;
