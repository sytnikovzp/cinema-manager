/* eslint-disable camelcase */
const { Movie, Actor } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { movies_actors } = await POSTGRES_DATA();
    const [movies, actors] = await Promise.all([
      Movie.findAll({ attributes: ['id', 'title'] }),
      Actor.findAll({ attributes: ['id', 'fullName'] }),
    ]);
    const movieMap = movies.reduce((acc, movie) => {
      acc[movie.title] = movie.id;
      return acc;
    }, {});
    const actorMap = actors.reduce((acc, actor) => {
      acc[actor.fullName] = actor.id;
      return acc;
    }, {});
    const updatedMovies_Actors = movies_actors
      .map(({ movie, actor, ...rest }) => {
        const movie_id = movieMap[movie];
        const actor_id = actorMap[actor];
        if (movie_id && actor_id) {
          return { movie_id, actor_id, ...rest };
        }
        if (!movie_id && !actor_id) {
          console.warn(`Not found: movie "${movie}" AND actor "${actor}"`);
        } else if (!movie_id) {
          console.warn(`Not found: movie "${movie}"`);
        } else if (!actor_id) {
          console.warn(`Not found: actor "${actor}"`);
        }
        return null;
      })
      .filter((item) => item !== null);
    await queryInterface.bulkInsert('movies_actors', updatedMovies_Actors, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('movies_actors', null, {});
  },
};
