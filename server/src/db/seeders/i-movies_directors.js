/* eslint-disable camelcase */
const { Movie, Director } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { movies_directors } = await POSTGRES_DATA();
    const [movies, directors] = await Promise.all([
      Movie.findAll({ attributes: ['uuid', 'title'] }),
      Director.findAll({ attributes: ['uuid', 'fullName'] }),
    ]);
    const movieMap = movies.reduce((acc, movie) => {
      acc[movie.title] = movie.uuid;
      return acc;
    }, {});
    const directorMap = directors.reduce((acc, director) => {
      acc[director.fullName] = director.uuid;
      return acc;
    }, {});
    const updatedMovies_Directors = movies_directors
      .map(({ movie, director, ...rest }) => {
        const movie_uuid = movieMap[movie];
        const director_uuid = directorMap[director];
        if (movie_uuid && director_uuid) {
          return { movie_uuid, director_uuid, ...rest };
        }
        if (!movie_uuid && !director_uuid) {
          console.warn(
            `Not found: movie "${movie}" AND director "${director}"`
          );
        } else if (!movie_uuid) {
          console.warn(`Not found: movie "${movie}"`);
        } else if (!director_uuid) {
          console.warn(`Not found: director "${director}"`);
        }
        return null;
      })
      .filter((item) => item !== null);
    await queryInterface.bulkInsert(
      'movies_directors',
      updatedMovies_Directors,
      {}
    );
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('movies_directors', null, {});
  },
};
