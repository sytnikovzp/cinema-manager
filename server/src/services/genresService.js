const { Genre } = require('../db/models');

const { notFound, badRequest } = require('../errors/generalErrors');
const { formatDateTime } = require('../utils/sharedFunctions');
const { isValidUUID } = require('../utils/validators');

const formatGenreData = (genre) => ({
  uuid: genre.uuid,
  title: genre.title,
  logo: genre.logo || '',
  createdAt: formatDateTime(genre.createdAt),
  updatedAt: formatDateTime(genre.updatedAt),
});

class GenresService {
  static async getAllGenres(limit, offset) {
    const foundGenres = await Genre.findAll({
      attributes: ['uuid', 'title', 'logo'],
      raw: true,
      limit,
      offset,
      order: [['uuid', 'DESC']],
    });
    if (!foundGenres.length) {
      throw notFound('Genres not found');
    }
    const allGenres = foundGenres.map((genre) => ({
      uuid: genre.uuid,
      title: genre.title,
      logo: genre.logo || '',
    }));
    const totalCount = await Genre.count();
    return {
      allGenres,
      totalCount,
    };
  }

  static async getGenreByUuid(uuid) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundGenre = await Genre.findByPk(uuid);
    if (!foundGenre) {
      throw notFound('Genre not found');
    }
    return formatGenreData(foundGenre);
  }

  static async createGenre(title, logoValue, transaction) {
    if (await Genre.findOne({ where: { title } })) {
      throw badRequest('This genre already exists');
    }
    const newGenre = await Genre.create(
      {
        title,
        logo: logoValue || null,
      },
      { transaction, returning: true }
    );
    if (!newGenre) {
      throw badRequest('No data has been created for this genre');
    }
    return formatGenreData(newGenre);
  }

  static async updateGenre(uuid, title, logoValue, transaction) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundGenre = await Genre.findByPk(uuid);
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
        logo: logoValue || null,
      },
      { where: { uuid }, returning: true, transaction }
    );
    if (!affectedRows) {
      throw badRequest('No data has been updated for this genre');
    }
    return formatGenreData(updatedGenre);
  }

  static async deleteGenre(uuid, transaction) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundGenre = await Genre.findByPk(uuid);
    if (!foundGenre) {
      throw notFound('Genre not found');
    }
    const deletedGenre = await Genre.destroy({
      where: { uuid },
      transaction,
    });
    if (!deletedGenre) {
      throw badRequest('No data has been deleted for this genre');
    }
    return deletedGenre;
  }
}

module.exports = GenresService;
