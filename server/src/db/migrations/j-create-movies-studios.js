/* eslint-disable camelcase */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movies_studios', {
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'movies',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      studio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'studios',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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

    await queryInterface.addConstraint('movies_studios', {
      fields: ['movie_id', 'studio_id'],
      type: 'primary key',
      name: 'movies_studios_pkey',
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('movies_studios');
  },
};
