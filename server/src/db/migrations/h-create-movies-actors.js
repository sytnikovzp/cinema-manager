/* eslint-disable camelcase */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movies_actors', {
      movie_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'movies',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      actor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'actors',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });

    await queryInterface.addConstraint('movies_actors', {
      fields: ['movie_id', 'actor_id'],
      type: 'primary key',
      name: 'movies_actors_pkey',
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('movies_actors');
  },
};
