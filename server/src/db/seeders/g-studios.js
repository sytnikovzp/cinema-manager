/* eslint-disable camelcase */
const { Location } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { studios } = await POSTGRES_DATA();
    const locations = await Location.findAll({
      attributes: ['uuid', 'title'],
    });
    const locationMap = locations.reduce((acc, location) => {
      acc[location.title] = location.uuid;
      return acc;
    }, {});
    const updatedStudios = studios.map((studio) => {
      const locationUuid = locationMap[studio.location];
      if (locationUuid) {
        studio.location_uuid = locationUuid;
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
