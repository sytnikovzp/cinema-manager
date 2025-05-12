/* eslint-disable camelcase */
const { Movie, Studio } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { movies_studios } = await POSTGRES_DATA();
    const [movies, studios] = await Promise.all([
      Movie.findAll({ attributes: ['id', 'title'] }),
      Studio.findAll({ attributes: ['id', 'title'] }),
    ]);
    const movieMap = movies.reduce((acc, movie) => {
      acc[movie.title] = movie.id;
      return acc;
    }, {});
    const studioMap = studios.reduce((acc, studio) => {
      acc[studio.title] = studio.id;
      return acc;
    }, {});
    const updatedMovies_Studios = movies_studios
      .map(({ movie, studio, ...rest }) => {
        const movie_id = movieMap[movie];
        const studio_id = studioMap[studio];
        if (movie_id && studio_id) {
          return { movie_id, studio_id, ...rest };
        }
        if (!movie_id && !studio_id) {
          console.warn(`Not found: movie "${movie}" AND studio "${studio}"`);
        } else if (!movie_id) {
          console.warn(`Not found: movie "${movie}"`);
        } else if (!studio_id) {
          console.warn(`Not found: studio "${studio}"`);
        }
        return null;
      })
      .filter((item) => item !== null);
    await queryInterface.bulkInsert(
      'movies_studios',
      updatedMovies_Studios,
      {}
    );
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('movies_studios', null, {});
  },
};
