/* eslint-disable camelcase */
const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { movies_directors } = await POSTGRES_DATA();
    await queryInterface.bulkInsert('movies_directors', movies_directors, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('movies_directors', null, {});
  },
};
