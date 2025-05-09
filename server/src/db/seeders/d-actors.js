const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { actors } = await POSTGRES_DATA();
    await queryInterface.bulkInsert('actors', actors, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('actors', null, {});
  },
};
