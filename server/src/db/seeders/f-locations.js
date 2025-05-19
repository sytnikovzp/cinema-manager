/* eslint-disable camelcase */
const { Country } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { locations } = await POSTGRES_DATA();
    const countries = await Country.findAll({
      attributes: ['uuid', 'title'],
    });
    const countryMap = countries.reduce((acc, country) => {
      acc[country.title] = country.uuid;
      return acc;
    }, {});
    const updatedLocations = locations.map((location) => {
      const countryUuid = countryMap[location.country];
      if (countryUuid) {
        location.country_uuid = countryUuid;
      }
      delete location.country;
      return location;
    });
    await queryInterface.bulkInsert('locations', updatedLocations, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('locations', null, {});
  },
};
