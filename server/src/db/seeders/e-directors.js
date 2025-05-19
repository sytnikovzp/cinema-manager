/* eslint-disable camelcase */
const { Country } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { directors } = await POSTGRES_DATA();
    const countries = await Country.findAll({
      attributes: ['uuid', 'title'],
    });
    const countryMap = countries.reduce((acc, country) => {
      acc[country.title] = country.uuid;
      return acc;
    }, {});
    const updatedDirectors = directors.map((director) => {
      const countryUuid = countryMap[director.country];
      if (countryUuid) {
        director.country_uuid = countryUuid;
      }
      delete director.country;
      return director;
    });
    await queryInterface.bulkInsert('directors', updatedDirectors, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('directors', null, {});
  },
};
