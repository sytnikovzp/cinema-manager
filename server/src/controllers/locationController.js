const createError = require('http-errors');

const { Location, Country, sequelize } = require('../db/models');

class LocationController {
  async getLocations(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const locations = await Location.findAll({
        attributes: ['id', 'title', 'coatOfArms'],
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

      const locationsCount = await Location.count();

      const formattedLocations = locations.map((location) => {
        return {
          id: location.id,
          title: location.title || '',
          coatOfArms: location.coatOfArms || '',
          country: location['Country.title'] || '',
        };
      });

      if (formattedLocations.length > 0) {
        res
          .status(200)
          .set('X-Total-Count', locationsCount)
          .json(formattedLocations);
      } else {
        next(createError(404, 'Locations not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getLocationById(req, res, next) {
    try {
      const {
        params: { locationId },
      } = req;

      const locationById = await Location.findByPk(locationId, {
        attributes: {
          exclude: ['countryId'],
        },
        include: [
          {
            model: Country,
            attributes: ['title'],
          },
        ],
      });

      if (locationById) {
        const locationData = locationById.toJSON();
        const formattedLocation = {
          ...locationData,
          title: locationData.title || '',
          coatOfArms: locationData.coatOfArms || '',
          country: locationData.Country ? locationData.Country.title : '',
        };

        delete formattedLocation.Country;

        res.status(200).json(formattedLocation);
      } else {
        console.log('Location not found!');
        next(createError(404, 'Location not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createLocation(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { title, country, coatOfArms } = req.body;

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

      const newBody = { title, countryId, coatOfArms };

      const replaceEmptyStringsWithNull = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );
      };

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const newLocation = await Location.create(processedBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newLocation) {
        await t.commit();
        const { id } = newLocation;
        return res.status(201).json({
          id,
          ...processedBody,
        });
      } else {
        await t.rollback();
        console.log('The location has not been created!');
        next(createError(400, 'The location has not been created!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateLocation(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { id, title, country, coatOfArms } = req.body;

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

      const newBody = { title, countryId, coatOfArms };

      const replaceEmptyStringsWithNull = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );
      };

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const [affectedRows, [updatedLocation]] = await Location.update(
        processedBody,
        {
          where: { id },
          returning: true,
          transaction: t,
        }
      );

      if (affectedRows > 0) {
        await t.commit();
        res.status(201).json(updatedLocation);
      } else {
        await t.rollback();
        console.log('The location has not been updated!');
        next(createError(400, 'The location has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async patchLocation(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { locationId },
        body: { title, country, coatOfArms },
      } = req;

      let countryId = null;
      if (country !== undefined) {
        if (country !== '') {
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
      }

      const newBody = {
        title,
        countryId,
        coatOfArms,
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

      const [affectedRows, [updatedLocation]] = await Location.update(
        processedBody,
        {
          where: {
            id: locationId,
          },
          returning: true,
          transaction: t,
        }
      );
      console.log(`Count of patched rows: ${affectedRows}`);

      if (affectedRows > 0) {
        await t.commit();
        res.status(200).json(updatedLocation);
      } else {
        await t.rollback();
        console.log('The location has not been updated!');
        next(createError(404, 'The location has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async deleteLocation(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { locationId },
      } = req;

      const delLocation = await Location.destroy({
        where: {
          id: locationId,
        },
        transaction: t,
      });

      if (delLocation) {
        await t.commit();
        res.sendStatus(res.statusCode);
      } else {
        await t.rollback();
        console.log('The location has not been deleted!');
        next(createError(400, 'The location has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new LocationController();
