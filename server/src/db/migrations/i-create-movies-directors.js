/* eslint-disable camelcase */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movies_directors', {
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
      director_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'directors',
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

    await queryInterface.addConstraint('movies_directors', {
      fields: ['movie_id', 'director_id'],
      type: 'primary key',
      name: 'movies_directors_pkey',
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('movies_directors');
  },
};
