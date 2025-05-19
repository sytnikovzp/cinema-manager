/* eslint-disable camelcase */
const { Movie, Studio } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { movies_studios } = await POSTGRES_DATA();
    const [movies, studios] = await Promise.all([
      Movie.findAll({ attributes: ['uuid', 'title'] }),
      Studio.findAll({ attributes: ['uuid', 'title'] }),
    ]);
    const movieMap = movies.reduce((acc, movie) => {
      acc[movie.title] = movie.uuid;
      return acc;
    }, {});
    const studioMap = studios.reduce((acc, studio) => {
      acc[studio.title] = studio.uuid;
      return acc;
    }, {});
    const updatedMovies_Studios = movies_studios
      .map(({ movie, studio, ...rest }) => {
        const movie_uuid = movieMap[movie];
        const studio_uuid = studioMap[studio];
        if (movie_uuid && studio_uuid) {
          return { movie_uuid, studio_uuid, ...rest };
        }
        if (!movie_uuid && !studio_uuid) {
          console.warn(`Not found: movie "${movie}" AND studio "${studio}"`);
        } else if (!movie_uuid) {
          console.warn(`Not found: movie "${movie}"`);
        } else if (!studio_uuid) {
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
