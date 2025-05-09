/* eslint-disable camelcase */
const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { movies_actors } = await POSTGRES_DATA();
    await queryInterface.bulkInsert('movies_actors', movies_actors, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('movies_actors', null, {});
  },
};
