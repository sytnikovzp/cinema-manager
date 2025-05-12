const createError = require('http-errors');

const { Director, Movie, Country, sequelize } = require('../db/models');

const { formatDateTime } = require('../utils/sharedFunctions');

class DirectorsController {
  static async getAllDirectors(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const directors = await Director.findAll({
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

      const directorsCount = await Director.count();

      const formattedDirectors = directors.map((director) => ({
        id: director.id,
        fullName: director.fullName || '',
        photo: director.photo || '',
        country: director['Country.title'] || '',
      }));

      if (formattedDirectors.length > 0) {
        res
          .status(200)
          .set('X-Total-Count', directorsCount)
          .json(formattedDirectors);
      } else {
        next(createError(404, 'Directors not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async getDirectorById(req, res, next) {
    try {
      const {
        params: { directorId },
      } = req;

      const directorById = await Director.findByPk(directorId, {
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

      if (directorById) {
        const directorData = directorById.toJSON();
        const formattedDirector = {
          ...directorData,
          fullName: directorData.fullName || '',
          birthDate: directorData.birthDate || '',
          deathDate: directorData.deathDate || '',
          photo: directorData.photo || '',
          biography: directorData.biography || '',
          country: directorData.Country ? directorData.Country.title : '',
          movies: directorData.Movies || [],
          createdAt: formatDateTime(directorData.createdAt),
          updatedAt: formatDateTime(directorData.updatedAt),
        };

        delete formattedDirector.Country;
        delete formattedDirector.Movies;

        res.status(200).json(formattedDirector);
      } else {
        next(createError(404, 'Director not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async createDirector(req, res, next) {
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

      const newDirector = await Director.create(processedBody, {
        returning: ['id'],
        transaction,
      });

      if (newDirector) {
        await transaction.commit();
        const { id } = newDirector;
        res.status(201).json({
          id,
          ...processedBody,
        });
      }
      await transaction.rollback();
      next(createError(400, 'The director has not been created!'));
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
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

      const [affectedRows, [updatedDirectors]] = await Director.update(
        processedBody,
        {
          where: {
            id: directorId,
          },
          returning: true,
          transaction,
        }
      );

      if (affectedRows > 0) {
        await transaction.commit();
        res.status(200).json(updatedDirectors);
      } else {
        await transaction.rollback();
        next(createError(404, 'The director has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }

  static async deleteDirector(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const {
        params: { directorId },
      } = req;

      const delDirector = await Director.destroy({
        where: {
          id: directorId,
        },
        transaction,
      });

      if (delDirector) {
        await transaction.commit();
        res.sendStatus(res.statusCode);
      } else {
        await transaction.rollback();
        next(createError(400, 'The director has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }
}

module.exports = DirectorsController;
