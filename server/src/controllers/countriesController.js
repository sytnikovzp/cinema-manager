const { sequelize } = require('../db/models');

const {
  getAllCountries,
  getCountryByUuid,
  createCountry,
  updateCountry,
  deleteCountry,
} = require('../services/countriesService');

class CountriesController {
  static async getAllCountries(req, res, next) {
    try {
      const {
        pagination: { limit, offset },
      } = req;
      const { allCountries, totalCount } = await getAllCountries(limit, offset);
      if (allCountries.length > 0) {
        res.status(200).set('X-Total-Count', totalCount).json(allCountries);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get all countries error: ', error.message);
      next(error);
    }
  }

  static async getCountryByUuid(req, res, next) {
    try {
      const {
        params: { countryUuid },
      } = req;
      const countryByUuid = await getCountryByUuid(countryUuid);
      if (countryByUuid) {
        res.status(200).json(countryByUuid);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get country by UUID error: ', error.message);
      next(error);
    }
  }

  static async createCountry(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { title, flag },
      } = req;
      const newCountry = await createCountry(title, flag, transaction);
      if (newCountry) {
        await transaction.commit();
        res.status(201).json(newCountry);
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Create country error: ', error.message);
      next(error);
    }
  }

  static async updateCountry(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { countryUuid },
        body: { title, flag },
      } = req;
      const updatedCountry = await updateCountry(
        countryUuid,
        title,
        flag,
        transaction
      );
      if (updatedCountry) {
        await transaction.commit();
        res.status(200).json(updatedCountry);
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Update country error: ', error.message);
      next(error);
    }
  }

  static async deleteCountry(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { countryUuid },
      } = req;
      const deletedCountry = await deleteCountry(countryUuid, transaction);
      if (deletedCountry) {
        await transaction.commit();
        res.status(200).json('OK');
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Delete country error: ', error.message);
      next(error);
    }
  }
}

module.exports = CountriesController;
