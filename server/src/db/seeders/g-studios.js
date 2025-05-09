const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { studios } = await POSTGRES_DATA();
    await queryInterface.bulkInsert('studios', studios, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('studios', null, {});
  },
};
