const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { genres } = await POSTGRES_DATA();
    await queryInterface.bulkInsert('genres', genres, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('genres', null, {});
  },
};
