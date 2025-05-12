/* eslint-disable camelcase */
const { Genre } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { movies } = await POSTGRES_DATA();
    const genres = await Genre.findAll({
      attributes: ['id', 'title'],
    });
    const genreMap = genres.reduce((acc, genre) => {
      acc[genre.title] = genre.id;
      return acc;
    }, {});
    const updatedMovies = movies.map((movie) => {
      const genreId = genreMap[movie.genre];
      if (genreId) {
        movie.genre_id = genreId;
      }
      delete movie.genre;
      return movie;
    });
    await queryInterface.bulkInsert('movies', updatedMovies, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('movies', null, {});
  },
};
