const { sequelize } = require('../db/models');

const {
  getAllActors,
  getActorByUuid,
  createActor,
  updateActor,
  deleteActor,
} = require('../services/actorsService');

class ActorsController {
  static async getAllActors(req, res, next) {
    try {
      const {
        pagination: { limit, offset },
      } = req;
      const { allActors, totalCount } = await getAllActors(limit, offset);
      if (allActors.length > 0) {
        res.status(200).set('X-Total-Count', totalCount).json(allActors);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get all actors error: ', error.message);
      next(error);
    }
  }

  static async getActorByUuid(req, res, next) {
    try {
      const {
        params: { actorUuid },
      } = req;
      const actorByUuid = await getActorByUuid(actorUuid);
      if (actorByUuid) {
        res.status(200).json(actorByUuid);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get actor by UUID error: ', error.message);
      next(error);
    }
  }

  static async createActor(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { fullName, country, birthDate, deathDate, photo, biography },
      } = req;
      const newActor = await createActor(
        fullName,
        country,
        birthDate,
        deathDate,
        photo,
        biography,
        transaction
      );
      if (newActor) {
        await transaction.commit();
        res.status(201).json(newActor);
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Create actor error: ', error.message);
      next(error);
    }
  }

  static async updateActor(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { actorUuid },
        body: { fullName, country, birthDate, deathDate, photo, biography },
      } = req;
      const updatedActor = await updateActor(
        actorUuid,
        fullName,
        country,
        birthDate,
        deathDate,
        photo,
        biography,
        transaction
      );
      if (updatedActor) {
        await transaction.commit();
        res.status(200).json(updatedActor);
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Update actor error: ', error.message);
      next(error);
    }
  }

  static async deleteActor(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { actorUuid },
      } = req;
      const deletedActor = await deleteActor(actorUuid, transaction);
      if (deletedActor) {
        await transaction.commit();
        res.status(200).json('OK');
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Delete actor error: ', error.message);
      next(error);
    }
  }
}

module.exports = ActorsController;
