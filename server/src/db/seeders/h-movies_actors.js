/* eslint-disable camelcase */
const {
  POSTGRES_DATA: { movies_actors },
} = require('../../constants');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('movies_actors', movies_actors, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('movies_actors', null, {});
  },
};
