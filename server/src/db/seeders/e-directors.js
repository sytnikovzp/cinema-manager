const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { directors } = await POSTGRES_DATA();
    await queryInterface.bulkInsert('directors', directors, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('directors', null, {});
  },
};
