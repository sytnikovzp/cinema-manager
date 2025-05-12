/* eslint-disable camelcase */
const { Country } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { locations } = await POSTGRES_DATA();
    const countries = await Country.findAll({
      attributes: ['id', 'title'],
    });
    const countryMap = countries.reduce((acc, country) => {
      acc[country.title] = country.id;
      return acc;
    }, {});
    const updatedLocations = locations.map((location) => {
      const countryId = countryMap[location.country];
      if (countryId) {
        location.country_id = countryId;
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
