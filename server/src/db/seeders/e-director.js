const { directors } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('directors', directors, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('directors', null, {});
  },
};
