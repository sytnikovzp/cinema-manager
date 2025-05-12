const { sequelize } = require('../db/models');

const {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} = require('../services/genresService');

class GenresController {
  static async getAllGenres(req, res, next) {
    try {
      const {
        pagination: { limit, offset },
      } = req;
      const { allGenres, totalCount } = await getAllGenres(limit, offset);
      if (allGenres.length > 0) {
        res.status(200).set('X-Total-Count', totalCount).json(allGenres);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get all genres error: ', error.message);
      next(error);
    }
  }

  static async getGenreById(req, res, next) {
    try {
      const {
        params: { genreId },
      } = req;
      const genreById = await getGenreById(genreId);
      if (genreById) {
        res.status(200).json(genreById);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get genre by ID error: ', error.message);
      next(error);
    }
  }

  static async createGenre(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { title, logo },
      } = req;
      const newGenre = await createGenre(title, logo, transaction);
      if (newGenre) {
        await transaction.commit();
        res.status(201).json(newGenre);
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Create genre error: ', error.message);
      next(error);
    }
  }

  static async updateGenre(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { genreId },
        body: { title, logo },
      } = req;
      const updatedGenre = await updateGenre(genreId, title, logo, transaction);
      if (updatedGenre) {
        await transaction.commit();
        res.status(200).json(updatedGenre);
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Update genre error: ', error.message);
      next(error);
    }
  }

  static async deleteGenre(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { genreId },
      } = req;
      const deletedGenre = await deleteGenre(genreId, transaction);
      if (deletedGenre) {
        await transaction.commit();
        res.status(200).json('OK');
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Delete genre error: ', error.message);
      next(error);
    }
  }
}

module.exports = GenresController;
