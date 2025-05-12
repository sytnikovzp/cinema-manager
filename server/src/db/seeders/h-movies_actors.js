/* eslint-disable camelcase */
const { Movie, Actor } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { movies_actors } = await POSTGRES_DATA();
    const [movies, actors] = await Promise.all([
      Movie.findAll({ attributes: ['id', 'title'] }),
      Actor.findAll({ attributes: ['id', 'full_name'] }),
    ]);
    const movieMap = movies.reduce((acc, movie) => {
      acc[movie.title] = movie.id;
      return acc;
    }, {});
    const actorMap = actors.reduce((acc, actor) => {
      acc[actor.full_name] = actor.id;
      return acc;
    }, {});
    const updatedMovies_Actors = movies_actors.map(
      ({ movie, actor, ...rest }) => ({
        movie_id: movieMap[movie] || null,
        actor_id: actorMap[actor] || null,
        ...rest,
      })
    );
    await queryInterface.bulkInsert('movies_actors', updatedMovies_Actors, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('movies_actors', null, {});
  },
};
