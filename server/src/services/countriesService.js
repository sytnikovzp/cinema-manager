const { Country } = require('../db/models');

const { notFound, badRequest } = require('../errors/generalErrors');
const { formatDateTime } = require('../utils/sharedFunctions');

const formatCountryData = (country) => ({
  id: country.id,
  title: country.title,
  flag: country.flag || '',
  createdAt: formatDateTime(country.createdAt),
  updatedAt: formatDateTime(country.updatedAt),
});

class CountriesService {
  static async getAllCountries(limit, offset) {
    const foundCountries = await Country.findAll({
      attributes: ['id', 'title', 'flag'],
      raw: true,
      limit,
      offset,
      order: [['id', 'DESC']],
    });
    if (!foundCountries.length) {
      throw notFound('Countries not found');
    }
    const allCountries = foundCountries.map((country) => ({
      id: country.id,
      title: country.title,
      flag: country.flag || '',
    }));
    const totalCount = await Country.count();
    return {
      allCountries,
      totalCount,
    };
  }

  static async getCountryById(id) {
    const foundCountry = await Country.findByPk(id);
    if (!foundCountry) {
      throw notFound('Country not found');
    }
    return formatCountryData(foundCountry);
  }

  static async createCountry(title, flag, transaction) {
    if (await Country.findOne({ where: { title } })) {
      throw badRequest('This country already exists');
    }
    const newCountry = await Country.create(
      {
        title,
        flag: flag || null,
      },
      { transaction, returning: true }
    );
    if (!newCountry) {
      throw badRequest('No data has been created for this country');
    }
    return formatCountryData(newCountry);
  }

  static async updateCountry(id, title, flag, transaction) {
    const foundCountry = await Country.findByPk(id);
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
        flag: flag || null,
      },
      { where: { id }, returning: true, transaction }
    );
    if (!affectedRows) {
      throw badRequest('No data has been updated for this country');
    }
    return formatCountryData(updatedCountry);
  }

  static async deleteCountry(id, transaction) {
    const foundCountry = await Country.findByPk(id);
    if (!foundCountry) {
      throw notFound('Country not found');
    }
    const deletedCountry = await Country.destroy({
      where: { id },
      transaction,
    });
    if (!deletedCountry) {
      throw badRequest('No data has been deleted for this country');
    }
    return deletedCountry;
  }
}

module.exports = CountriesService;
