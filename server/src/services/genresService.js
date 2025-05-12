const { Genre } = require('../db/models');

const { notFound, badRequest } = require('../errors/generalErrors');
const { formatDateTime } = require('../utils/sharedFunctions');

const formatGenreData = (genre) => ({
  id: genre.id,
  title: genre.title,
  logo: genre.logo || '',
  createdAt: formatDateTime(genre.createdAt),
  updatedAt: formatDateTime(genre.updatedAt),
});

class GenresService {
  static async getAllGenres(limit, offset) {
    const foundGenres = await Genre.findAll({
      attributes: ['id', 'title', 'logo'],
      raw: true,
      limit,
      offset,
      order: [['id', 'DESC']],
    });
    if (!foundGenres.length) {
      throw notFound('Genres not found');
    }
    const allGenres = foundGenres.map((genre) => ({
      id: genre.id,
      title: genre.title,
      logo: genre.logo || '',
    }));
    const totalCount = await Genre.count();
    return {
      allGenres,
      totalCount,
    };
  }

  static async getGenreById(id) {
    const foundGenre = await Genre.findOne({ where: { id } });
    if (!foundGenre) {
      throw notFound('Genre not found');
    }
    return formatGenreData(foundGenre);
  }

  static async createGenre(title, logo, transaction) {
    if (await Genre.findOne({ where: { title } })) {
      throw badRequest('This genre already exists');
    }
    const newGenre = await Genre.create(
      {
        title,
        logo: logo || null,
      },
      { transaction, returning: true }
    );
    if (!newGenre) {
      throw badRequest('No data has been created for this genre');
    }
    return formatGenreData(newGenre);
  }

  static async updateGenre(id, title, logo, transaction) {
    const foundGenre = await Genre.findOne({ where: { id } });
    if (!foundGenre) {
      throw notFound('Genre not found');
    }
    if (title && title !== foundGenre.title) {
      const duplicateGenre = await Genre.findOne({ where: { title } });
      if (duplicateGenre) {
        throw badRequest('This genre already exists');
      }
    }
    const [affectedRows, [updatedGenre]] = await Genre.update(
      {
        title,
        logo: logo || null,
      },
      { where: { id }, returning: true, transaction }
    );
    if (!affectedRows) {
      throw badRequest('No data has been updated for this genre');
    }
    return formatGenreData(updatedGenre);
  }

  static async deleteGenre(id, transaction) {
    const foundGenre = await Genre.findOne({ where: { id } });
    if (!foundGenre) {
      throw notFound('Genre not found');
    }
    const deletedGenre = await Genre.destroy({
      where: { id },
      transaction,
    });
    if (!deletedGenre) {
      throw badRequest('No data has been deleted for this genre');
    }
    return deletedGenre;
  }
}

module.exports = GenresService;
