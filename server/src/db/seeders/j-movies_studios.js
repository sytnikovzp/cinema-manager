/* eslint-disable camelcase */
const { movies_studios } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('movies_studios', movies_studios, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('movies_studios', null, {});
  },
};
