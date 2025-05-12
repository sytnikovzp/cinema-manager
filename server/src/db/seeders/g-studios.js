/* eslint-disable camelcase */
const { Location } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { studios } = await POSTGRES_DATA();
    const locations = await Location.findAll({
      attributes: ['id', 'title'],
    });
    const locationMap = locations.reduce((acc, location) => {
      acc[location.title] = location.id;
      return acc;
    }, {});
    const updatedStudios = studios.map((studio) => {
      const locationId = locationMap[studio.location];
      if (locationId) {
        studio.location_id = locationId;
      }
      delete studio.location;
      return studio;
    });
    await queryInterface.bulkInsert('studios', updatedStudios, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('studios', null, {});
  },
};
