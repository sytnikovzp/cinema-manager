const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { locations } = await POSTGRES_DATA();
    await queryInterface.bulkInsert('locations', locations, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('locations', null, {});
  },
};
