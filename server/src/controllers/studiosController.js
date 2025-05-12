const createError = require('http-errors');

const { Movie, Studio, Location, Country, sequelize } = require('../db/models');

const { formatDateTime } = require('../utils/sharedFunctions');

class StudiosController {
  static async getAllStudios(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const studios = await Studio.findAll({
        attributes: ['id', 'title', 'foundationYear', 'logo'],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });

      const studiosCount = await Studio.count();

      const formattedStudios = studios.map((studio) => ({
        id: studio.id,
        title: studio.title || '',
        foundationYear: studio.foundationYear || '',
        logo: studio.logo || '',
      }));

      if (formattedStudios.length > 0) {
        res
          .status(200)
          .set('X-Total-Count', studiosCount)
          .json(formattedStudios);
      } else {
        next(createError(404, 'Studios not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async getStudioById(req, res, next) {
    try {
      const {
        params: { studioId },
      } = req;

      const studioById = await Studio.findByPk(studioId, {
        attributes: {
          exclude: ['locationId'],
        },
        include: [
          {
            model: Location,
            attributes: ['title'],
            include: [
              {
                model: Country,
                attributes: ['title'],
              },
            ],
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

      if (studioById) {
        const studioData = studioById.toJSON();
        const formattedStudio = {
          ...studioData,
          title: studioData.title || '',
          location: studioData.Location ? studioData.Location.title : '',
          country: studioData.Location ? studioData.Location.Country.title : '',
          foundationYear: studioData.foundationYear || '',
          logo: studioData.logo || '',
          about: studioData.about || '',
          movies: studioData.Movies || [],
          createdAt: formatDateTime(studioData.createdAt),
          updatedAt: formatDateTime(studioData.updatedAt),
        };

        delete formattedStudio.Location;
        delete formattedStudio.Movies;

        res.status(200).json(formattedStudio);
      } else {
        next(createError(404, 'Studio not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async createStudio(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const { title, location, foundationYear, logo, about } = req.body;

      const locationValue = location === '' ? null : location;

      const locationRecord = locationValue
        ? await Location.findOne({
            where: { title: locationValue },
            attributes: ['id'],
            raw: true,
          })
        : null;

      if (locationValue && !locationRecord) {
        throw new Error('Location not found');
      }

      const locationId = locationRecord ? locationRecord.id : null;

      const newBody = {
        title,
        locationId,
        foundationYear,
        logo,
        about,
      };

      const replaceEmptyStringsWithNull = (obj) =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const newStudio = await Studio.create(processedBody, {
        returning: ['id'],
        transaction,
      });

      if (newStudio) {
        await transaction.commit();
        const { id } = newStudio;
        res.status(201).json({
          id,
          ...processedBody,
        });
      }
      await transaction.rollback();
      next(createError(400, 'The studio has not been created!'));
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }

  static async updateStudio(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const {
        params: { studioId },
        body: { title, location, foundationYear, logo, about },
      } = req;

      let locationId = null;
      if (location && location !== '') {
        const locationRecord = await Location.findOne({
          where: {
            title: location,
          },
          attributes: ['id'],
          raw: true,
        });

        if (!locationRecord) {
          throw new Error('Location not found');
        }

        locationId = locationRecord.id;
      }

      const newBody = {
        title,
        locationId,
        foundationYear,
        logo,
        about,
      };

      const replaceEmptyStringsWithNull = (obj) =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const [affectedRows, [updatedStudios]] = await Studio.update(
        processedBody,
        {
          where: {
            id: studioId,
          },
          returning: true,
          transaction,
        }
      );
      console.log(`Count of patched rows: ${affectedRows}`);

      if (affectedRows > 0) {
        await transaction.commit();
        res.status(200).json(updatedStudios);
      } else {
        await transaction.rollback();
        next(createError(404, 'The studio has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }

  static async deleteStudio(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const {
        params: { studioId },
      } = req;

      const delStudio = await Studio.destroy({
        where: {
          id: studioId,
        },
        transaction,
      });

      if (delStudio) {
        await transaction.commit();
        res.sendStatus(res.statusCode);
      } else {
        await transaction.rollback();
        next(createError(400, 'The studio has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }
}

module.exports = StudiosController;
