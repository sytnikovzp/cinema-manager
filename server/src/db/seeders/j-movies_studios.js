/* eslint-disable camelcase */
const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { movies_studios } = await POSTGRES_DATA();
    await queryInterface.bulkInsert('movies_studios', movies_studios, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('movies_studios', null, {});
  },
};
