/* eslint-disable camelcase */
const { Movie, Director } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { movies_directors } = await POSTGRES_DATA();
    const [movies, directors] = await Promise.all([
      Movie.findAll({ attributes: ['id', 'title'] }),
      Director.findAll({ attributes: ['id', 'fullName'] }),
    ]);
    const movieMap = movies.reduce((acc, movie) => {
      acc[movie.title] = movie.id;
      return acc;
    }, {});
    const directorMap = directors.reduce((acc, director) => {
      acc[director.fullName] = director.id;
      return acc;
    }, {});
    const updatedMovies_Directors = movies_directors
      .map(({ movie, director, ...rest }) => {
        const movie_id = movieMap[movie];
        const director_id = directorMap[director];
        if (movie_id && director_id) {
          return { movie_id, director_id, ...rest };
        }
        if (!movie_id && !director_id) {
          console.warn(
            `Not found: movie "${movie}" AND director "${director}"`
          );
        } else if (!movie_id) {
          console.warn(`Not found: movie "${movie}"`);
        } else if (!director_id) {
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
