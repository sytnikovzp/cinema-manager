/* eslint-disable camelcase */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable('movies', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      genre_uuid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'genres',
          key: 'uuid',
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
    await queryInterface.sequelize.query(
      'DROP EXTENSION IF EXISTS "uuid-ossp";'
    );
    await queryInterface.dropTable('movies');
  },
};
