const createError = require('http-errors');

const { Country, sequelize } = require('../db/models');

class CountriesController {
  static async getAllCountries(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const countries = await Country.findAll({
        attributes: ['id', 'title', 'flag'],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });

      const countriesCount = await Country.count();

      const formattedCountries = countries.map((country) => ({
        id: country.id,
        title: country.title || '',
        flag: country.flag || '',
      }));

      if (formattedCountries.length > 0) {
        res
          .status(200)
          .set('X-Total-Count', countriesCount)
          .json(formattedCountries);
      } else {
        next(createError(404, 'Countries not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async getCountryById(req, res, next) {
    try {
      const {
        params: { countryId },
      } = req;

      const countryById = await Country.findByPk(countryId);

      if (countryById) {
        const countryData = countryById.toJSON();
        const formattedCountry = {
          ...countryData,
          title: countryData.title || '',
          flag: countryData.flag || '',
        };

        res.status(200).json(formattedCountry);
      } else {
        next(createError(404, 'Country not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async createCountry(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const { title, flag } = req.body;

      const newBody = { title, flag };

      const replaceEmptyStringsWithNull = (obj) =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const newCountry = await Country.create(processedBody, {
        returning: ['id'],
        transaction,
      });

      if (newCountry) {
        await transaction.commit();
        const { id } = newCountry;
        res.status(201).json({
          id,
          ...processedBody,
        });
      }
      await transaction.rollback();
      next(createError(400, 'The country has not been created!'));
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }

  static async updateCountry(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const {
        params: { countryId },
        body: { title, flag },
      } = req;

      const newBody = { title, flag };

      const replaceEmptyStringsWithNull = (obj) =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const [affectedRows, [updatedCountry]] = await Country.update(
        processedBody,
        {
          where: {
            id: countryId,
          },
          returning: true,
          transaction,
        }
      );

      if (affectedRows > 0) {
        await transaction.commit();
        res.status(200).json(updatedCountry);
      } else {
        await transaction.rollback();
        next(createError(404, 'The country has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }

  static async deleteCountry(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const {
        params: { countryId },
      } = req;

      const delCountry = await Country.destroy({
        where: {
          id: countryId,
        },
        transaction,
      });

      if (delCountry) {
        await transaction.commit();
        res.sendStatus(res.statusCode);
      } else {
        await transaction.rollback();
        next(createError(400, 'The country has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }
}

module.exports = CountriesController;
