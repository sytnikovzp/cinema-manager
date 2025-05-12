const createError = require('http-errors');

const { Actor, Movie, Country, sequelize } = require('../db/models');

const { formatDateTime } = require('../utils/sharedFunctions');

class ActorsController {
  static async getAllActors(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const actors = await Actor.findAll({
        attributes: ['id', 'fullName', 'photo'],
        include: [
          {
            model: Country,
            attributes: ['title'],
          },
        ],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });

      const actorsCount = await Actor.count();

      const formattedActors = actors.map((actor) => ({
        id: actor.id,
        fullName: actor.fullName || '',
        photo: actor.photo || '',
        country: actor['Country.title'] || '',
      }));

      if (formattedActors.length > 0) {
        res.status(200).set('X-Total-Count', actorsCount).json(formattedActors);
      } else {
        next(createError(404, 'Actors not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async getActorById(req, res, next) {
    try {
      const {
        params: { actorId },
      } = req;

      const actorById = await Actor.findByPk(actorId, {
        attributes: {
          exclude: ['countryId'],
        },
        include: [
          {
            model: Country,
            attributes: ['title'],
          },
          {
            model: Movie,
            attributes: ['id', 'title'],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (actorById) {
        const actorData = actorById.toJSON();
        const formattedActor = {
          ...actorData,
          fullName: actorData.fullName || '',
          birthDate: actorData.birthDate || '',
          deathDate: actorData.deathDate || '',
          photo: actorData.photo || '',
          biography: actorData.biography || '',
          country: actorData.Country ? actorData.Country.title : '',
          movies: actorData.Movies || [],
          createdAt: formatDateTime(actorData.createdAt),
          updatedAt: formatDateTime(actorData.updatedAt),
        };

        delete formattedActor.Country;
        delete formattedActor.Movies;

        res.status(200).json(formattedActor);
      } else {
        next(createError(404, 'Actor not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async createActor(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const { fullName, country, birthDate, deathDate, photo, biography } =
        req.body;

      const countryValue = country === '' ? null : country;

      const countryRecord = countryValue
        ? await Country.findOne({
            where: { title: countryValue },
            attributes: ['id'],
            raw: true,
          })
        : null;

      if (countryValue && !countryRecord) {
        throw new Error('Country not found');
      }

      const countryId = countryRecord ? countryRecord.id : null;

      const newBody = {
        fullName,
        countryId,
        birthDate,
        deathDate,
        photo,
        biography,
      };

      const replaceEmptyStringsWithNull = (obj) =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const newActor = await Actor.create(processedBody, {
        returning: ['id'],
        transaction,
      });

      if (newActor) {
        await transaction.commit();
        const { id } = newActor;
        res.status(201).json({
          id,
          ...processedBody,
        });
      }
      await transaction.rollback();
      next(createError(400, 'The actor has not been created!'));
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }

  static async updateActor(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const {
        params: { actorId },
        body: { fullName, country, birthDate, deathDate, photo, biography },
      } = req;

      let countryId = null;
      if (country && country !== '') {
        const countryRecord = await Country.findOne({
          where: {
            title: country,
          },
          attributes: ['id'],
          raw: true,
        });

        if (!countryRecord) {
          throw new Error('Country not found');
        }

        countryId = countryRecord.id;
      }

      const newBody = {
        fullName,
        countryId,
        birthDate,
        deathDate,
        photo,
        biography,
      };

      const replaceEmptyStringsWithNull = (obj) =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const [affectedRows, [updatedActor]] = await Actor.update(processedBody, {
        where: {
          id: actorId,
        },
        returning: true,
        transaction,
      });

      if (affectedRows > 0) {
        await transaction.commit();
        res.status(200).json(updatedActor);
      } else {
        await transaction.rollback();
        next(createError(404, 'The actor has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }

  static async deleteActor(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const {
        params: { actorId },
      } = req;

      const delActor = await Actor.destroy({
        where: {
          id: actorId,
        },
        transaction,
      });

      if (delActor) {
        await transaction.commit();
        res.sendStatus(res.statusCode);
      } else {
        await transaction.rollback();
        next(createError(400, 'The actor has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }
}

module.exports = ActorsController;
