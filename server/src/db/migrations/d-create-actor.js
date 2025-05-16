/* eslint-disable camelcase */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('actors', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      full_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'countries',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      death_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      photo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      biography: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('actors');
  },
};
