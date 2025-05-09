const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { movies } = await POSTGRES_DATA();
    await queryInterface.bulkInsert('movies', movies, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('movies', null, {});
  },
};
