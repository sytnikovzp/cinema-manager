const createError = require('http-errors');
const moment = require('moment');

const { Movie, Studio, Location, Country, sequelize } = require('../db/models');

class StudioController {
  async getStudios(req, res, next) {
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

      const formattedStudios = studios.map((studio) => {
        return {
          id: studio.id,
          title: studio.title || '',
          foundationYear: studio.foundationYear || '',
          logo: studio.logo || '',
        };
      });

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

  async getStudioById(req, res, next) {
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
          createdAt: moment(studioData.createdAt).format('DD-MM-YYYY HH:mm'),
          updatedAt: moment(studioData.updatedAt).format('DD-MM-YYYY HH:mm'),
        };

        delete formattedStudio.Location;
        delete formattedStudio.Movies;

        res.status(200).json(formattedStudio);
      } else {
        console.log('Studio not found!');
        next(createError(404, 'Studio not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createStudio(req, res, next) {
    const t = await sequelize.transaction();

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

      const replaceEmptyStringsWithNull = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );
      };

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const newStudio = await Studio.create(processedBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newStudio) {
        await t.commit();
        const { id } = newStudio;
        return res.status(201).json({
          id,
          ...processedBody,
        });
      } else {
        await t.rollback();
        console.log('The studio has not been created!');
        next(createError(400, 'The studio has not been created!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateStudio(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { id, title, location, foundationYear, logo, about } = req.body;

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

      const replaceEmptyStringsWithNull = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );
      };

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const [affectedRows, [updatedStudio]] = await Studio.update(
        processedBody,
        {
          where: { id },
          returning: true,
          transaction: t,
        }
      );

      if (affectedRows > 0) {
        await t.commit();
        res.status(201).json(updatedStudio);
      } else {
        await t.rollback();
        console.log('The studio has not been updated!');
        next(createError(400, 'The studio has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async patchStudio(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { studioId },
        body: { title, location, foundationYear, logo, about },
      } = req;

      let locationId = null;
      if (location !== undefined) {
        if (location !== '') {
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
      }

      const newBody = {
        title,
        locationId,
        foundationYear,
        logo,
        about,
      };

      const replaceEmptyStringsWithNull = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );
      };

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const [affectedRows, [updatedStudios]] = await Studio.update(
        processedBody,
        {
          where: {
            id: studioId,
          },
          returning: true,
          transaction: t,
        }
      );
      console.log(`Count of patched rows: ${affectedRows}`);

      if (affectedRows > 0) {
        await t.commit();
        res.status(200).json(updatedStudios);
      } else {
        await t.rollback();
        console.log('The studio has not been updated!');
        next(createError(404, 'The studio has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async deleteStudio(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { studioId },
      } = req;

      const delStudio = await Studio.destroy({
        where: {
          id: studioId,
        },
        transaction: t,
      });

      if (delStudio) {
        await t.commit();
        res.sendStatus(res.statusCode);
      } else {
        await t.rollback();
        console.log('The studio has not been deleted!');
        next(createError(400, 'The studio has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new StudioController();
