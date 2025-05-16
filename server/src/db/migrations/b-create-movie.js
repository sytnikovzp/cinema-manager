/* eslint-disable camelcase */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movies', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      genre_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'genres',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      release_year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      poster: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      trailer: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      storyline: {
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
    await queryInterface.dropTable('movies');
  },
};
