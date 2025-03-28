const { studios } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('studios', studios, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('studios', null, {});
  },
};
