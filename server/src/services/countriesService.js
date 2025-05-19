const { Country } = require('../db/models');

const { notFound, badRequest } = require('../errors/generalErrors');
const { formatDateTime } = require('../utils/sharedFunctions');
const { isValidUUID } = require('../utils/validators');

const formatCountryData = (country) => ({
  uuid: country.uuid,
  title: country.title,
  flag: country.flag || '',
  createdAt: formatDateTime(country.createdAt),
  updatedAt: formatDateTime(country.updatedAt),
});

class CountriesService {
  static async getAllCountries(limit, offset) {
    const foundCountries = await Country.findAll({
      attributes: ['uuid', 'title', 'flag'],
      raw: true,
      limit,
      offset,
      order: [['uuid', 'DESC']],
    });
    if (!foundCountries.length) {
      throw notFound('Countries not found');
    }
    const allCountries = foundCountries.map((country) => ({
      uuid: country.uuid,
      title: country.title,
      flag: country.flag || '',
    }));
    const totalCount = await Country.count();
    return {
      allCountries,
      totalCount,
    };
  }

  static async getCountryByUuid(uuid) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundCountry = await Country.findByPk(uuid);
    if (!foundCountry) {
      throw notFound('Country not found');
    }
    return formatCountryData(foundCountry);
  }

  static async createCountry(title, flagValue, transaction) {
    if (await Country.findOne({ where: { title } })) {
      throw badRequest('This country already exists');
    }
    const newCountry = await Country.create(
      {
        title,
        flag: flagValue || null,
      },
      { transaction, returning: true }
    );
    if (!newCountry) {
      throw badRequest('No data has been created for this country');
    }
    return formatCountryData(newCountry);
  }

  static async updateCountry(uuid, title, flagValue, transaction) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundCountry = await Country.findByPk(uuid);
    if (!foundCountry) {
      throw notFound('Country not found');
    }
    if (title && title !== foundCountry.title) {
      const duplicateCountry = await Country.findOne({ where: { title } });
      if (duplicateCountry) {
        throw badRequest('This country already exists');
      }
    }
    const [affectedRows, [updatedCountry]] = await Country.update(
      {
        title,
        flag: flagValue || null,
      },
      { where: { uuid }, returning: true, transaction }
    );
    if (!affectedRows) {
      throw badRequest('No data has been updated for this country');
    }
    return formatCountryData(updatedCountry);
  }

  static async deleteCountry(uuid, transaction) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundCountry = await Country.findByPk(uuid);
    if (!foundCountry) {
      throw notFound('Country not found');
    }
    const deletedCountry = await Country.destroy({
      where: { uuid },
      transaction,
    });
    if (!deletedCountry) {
      throw badRequest('No data has been deleted for this country');
    }
    return deletedCountry;
  }
}

module.exports = CountriesService;
