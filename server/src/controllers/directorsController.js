const { sequelize } = require('../db/models');

const {
  getAllDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
} = require('../services/directorsService');

class DirectorsController {
  static async getAllDirectors(req, res, next) {
    try {
      const {
        pagination: { limit, offset },
      } = req;
      const { allDirectors, totalCount } = await getAllDirectors(limit, offset);
      if (allDirectors.length > 0) {
        res.status(200).set('X-Total-Count', totalCount).json(allDirectors);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get all directors error: ', error.message);
      next(error);
    }
  }

  static async getDirectorById(req, res, next) {
    try {
      const {
        params: { directorId },
      } = req;
      const directorById = await getDirectorById(directorId);
      if (directorById) {
        res.status(200).json(directorById);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get director by ID error: ', error.message);
      next(error);
    }
  }

  static async createDirector(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { fullName, country, birthDate, deathDate, photo, biography },
      } = req;
      const newDirector = await createDirector(
        fullName,
        country,
        birthDate,
        deathDate,
        photo,
        biography,
        transaction
      );
      if (newDirector) {
        await transaction.commit();
        res.status(201).json(newDirector);
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Create director error: ', error.message);
      next(error);
    }
  }

  static async updateDirector(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { directorId },
        body: { fullName, country, birthDate, deathDate, photo, biography },
      } = req;
      const updatedDirector = await updateDirector(
        directorId,
        fullName,
        country,
        birthDate,
        deathDate,
        photo,
        biography,
        transaction
      );
      if (updatedDirector) {
        await transaction.commit();
        res.status(200).json(updatedDirector);
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Update director error: ', error.message);
      next(error);
    }
  }

  static async deleteDirector(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { directorId },
      } = req;
      const deletedDirector = await deleteDirector(directorId, transaction);
      if (deletedDirector) {
        await transaction.commit();
        res.status(200).json('OK');
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Delete director error: ', error.message);
      next(error);
    }
  }
}

module.exports = DirectorsController;
