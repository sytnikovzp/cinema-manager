const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { countries } = await POSTGRES_DATA();
    await queryInterface.bulkInsert('countries', countries, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('countries', null, {});
  },
};
