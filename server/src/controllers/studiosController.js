const { sequelize } = require('../db/models');

const {
  getAllStudios,
  getStudioByUuid,
  createStudio,
  updateStudio,
  deleteStudio,
} = require('../services/studiosService');

class StudiosController {
  static async getAllStudios(req, res, next) {
    try {
      const {
        pagination: { limit, offset },
      } = req;
      const { allStudios, totalCount } = await getAllStudios(limit, offset);
      if (allStudios.length > 0) {
        res.status(200).set('X-Total-Count', totalCount).json(allStudios);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get all studios error: ', error.message);
      next(error);
    }
  }

  static async getStudioByUuid(req, res, next) {
    try {
      const {
        params: { studioUuid },
      } = req;
      const studioByUuid = await getStudioByUuid(studioUuid);
      if (studioByUuid) {
        res.status(200).json(studioByUuid);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get studio by UUID error: ', error.message);
      next(error);
    }
  }

  static async createStudio(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { title, location, foundationYear, logo, about },
      } = req;
      const newStudio = await createStudio(
        title,
        location,
        foundationYear,
        logo,
        about,
        transaction
      );
      if (newStudio) {
        await transaction.commit();
        res.status(201).json(newStudio);
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Create studio error: ', error.message);
      next(error);
    }
  }

  static async updateStudio(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { studioUuid },
        body: { title, location, foundationYear, logo, about },
      } = req;
      const updatedStudio = await updateStudio(
        studioUuid,
        title,
        location,
        foundationYear,
        logo,
        about,
        transaction
      );
      if (updatedStudio) {
        await transaction.commit();
        res.status(200).json(updatedStudio);
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Update studio error: ', error.message);
      next(error);
    }
  }

  static async deleteStudio(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { studioUuid },
      } = req;
      const deletedStudio = await deleteStudio(studioUuid, transaction);
      if (deletedStudio) {
        await transaction.commit();
        res.status(200).json('OK');
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Delete studio error: ', error.message);
      next(error);
    }
  }
}

module.exports = StudiosController;
