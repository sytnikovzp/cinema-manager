const { countries } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('countries', countries, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('countries', null, {});
  },
};
