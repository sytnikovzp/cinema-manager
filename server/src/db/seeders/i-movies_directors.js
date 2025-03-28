/* eslint-disable camelcase */
const { movies_directors } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('movies_directors', movies_directors, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('movies_directors', null, {});
  },
};
