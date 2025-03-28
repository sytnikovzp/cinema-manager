const { locations } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('locations', locations, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('locations', null, {});
  },
};
