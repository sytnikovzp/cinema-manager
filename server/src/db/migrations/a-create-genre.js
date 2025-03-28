module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('genres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      logo: {
        type: Sequelize.TEXT,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('genres');
  },
};
