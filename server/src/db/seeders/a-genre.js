const { genres } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('genres', genres, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('genres', null, {});
  },
};
