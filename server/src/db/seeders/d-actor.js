const { actors } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('actors', actors, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('actors', null, {});
  },
};
