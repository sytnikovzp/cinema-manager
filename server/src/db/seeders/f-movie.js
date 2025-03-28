const { movies } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('movies', movies, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('movies', null, {});
  },
};
