/* eslint-disable camelcase */
const { Movie, Actor } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { movies_actors } = await POSTGRES_DATA();
    const [movies, actors] = await Promise.all([
      Movie.findAll({ attributes: ['uuid', 'title'] }),
      Actor.findAll({ attributes: ['uuid', 'fullName'] }),
    ]);
    const movieMap = movies.reduce((acc, movie) => {
      acc[movie.title] = movie.uuid;
      return acc;
    }, {});
    const actorMap = actors.reduce((acc, actor) => {
      acc[actor.fullName] = actor.uuid;
      return acc;
    }, {});
    const updatedMovies_Actors = movies_actors
      .map(({ movie, actor, ...rest }) => {
        const movie_uuid = movieMap[movie];
        const actor_uuid = actorMap[actor];
        if (movie_uuid && actor_uuid) {
          return { movie_uuid, actor_uuid, ...rest };
        }
        if (!movie_uuid && !actor_uuid) {
          console.warn(`Not found: movie "${movie}" AND actor "${actor}"`);
        } else if (!movie_uuid) {
          console.warn(`Not found: movie "${movie}"`);
        } else if (!actor_uuid) {
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
