const createError = require('http-errors');

const { Country, sequelize } = require('../db/models');

class CountryController {
  async getCountries(req, res, next) {
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

      const formattedCountries = countries.map((country) => {
        return {
          id: country.id,
          title: country.title || '',
          flag: country.flag || '',
        };
      });

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

  async getCountryById(req, res, next) {
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
        console.log('Country not found!');
        next(createError(404, 'Country not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createCountry(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { title, flag } = req.body;

      const newBody = { title, flag };

      const replaceEmptyStringsWithNull = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );
      };

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const newCountry = await Country.create(processedBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newCountry) {
        await t.commit();
        const { id } = newCountry;
        return res.status(201).json({
          id,
          ...processedBody,
        });
      } else {
        await t.rollback();
        console.log('The country has not been created!');
        next(createError(400, 'The country has not been created!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateCountry(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { id, title, flag } = req.body;

      const newBody = { title, flag };

      const replaceEmptyStringsWithNull = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );
      };

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const [affectedRows, [updatedCountry]] = await Country.update(
        processedBody,
        {
          where: { id },
          returning: true,
          transaction: t,
        }
      );

      if (affectedRows > 0) {
        await t.commit();
        res.status(201).json(updatedCountry);
      } else {
        await t.rollback();
        console.log('The country has not been updated!');
        next(createError(400, 'The country has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async patchCountry(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { countryId },
        body: { title, flag },
      } = req;

      const newBody = { title, flag };

      const replaceEmptyStringsWithNull = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );
      };

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const [affectedRows, [updatedCountry]] = await Country.update(
        processedBody,
        {
          where: {
            id: countryId,
          },
          returning: true,
          transaction: t,
        }
      );
      console.log(`Count of patched rows: ${affectedRows}`);

      if (affectedRows > 0) {
        await t.commit();
        res.status(200).json(updatedCountry);
      } else {
        await t.rollback();
        console.log('The country has not been updated!');
        next(createError(404, 'The country has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async deleteCountry(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { countryId },
      } = req;

      const delCountry = await Country.destroy({
        where: {
          id: countryId,
        },
        transaction: t,
      });

      if (delCountry) {
        await t.commit();
        res.sendStatus(res.statusCode);
      } else {
        await t.rollback();
        console.log('The country has not been deleted!');
        next(createError(400, 'The country has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new CountryController();
