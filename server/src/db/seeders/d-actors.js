/* eslint-disable camelcase */
const { Country } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { actors } = await POSTGRES_DATA();
    const countries = await Country.findAll({
      attributes: ['uuid', 'title'],
    });
    const countryMap = countries.reduce((acc, country) => {
      acc[country.title] = country.uuid;
      return acc;
    }, {});
    const updatedActors = actors.map((actor) => {
      const countryUuid = countryMap[actor.country];
      if (countryUuid) {
        actor.country_uuid = countryUuid;
      }
      delete actor.country;
      return actor;
    });
    await queryInterface.bulkInsert('actors', updatedActors, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('actors', null, {});
  },
};
