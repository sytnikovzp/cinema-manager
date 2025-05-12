const createError = require('http-errors');

const { Genre, sequelize } = require('../db/models');

class GenresController {
  static async getAllGenres(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const genres = await Genre.findAll({
        attributes: ['id', 'title', 'logo'],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });

      const genresCount = await Genre.count();

      const formattedGenres = genres.map((genre) => ({
        id: genre.id,
        title: genre.title || '',
        logo: genre.logo || '',
      }));

      if (formattedGenres.length > 0) {
        res.status(200).set('X-Total-Count', genresCount).json(formattedGenres);
      } else {
        next(createError(404, 'Genres not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async getGenreById(req, res, next) {
    try {
      const {
        params: { genreId },
      } = req;

      const genreById = await Genre.findByPk(genreId);

      if (genreById) {
        const genreData = genreById.toJSON();
        const formattedGenre = {
          ...genreData,
          title: genreData.title || '',
          logo: genreData.logo || '',
        };

        res.status(200).json(formattedGenre);
      } else {
        next(createError(404, 'Genre not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async createGenre(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const { title, logo } = req.body;

      const newBody = { title, logo };

      const replaceEmptyStringsWithNull = (obj) =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const newGenre = await Genre.create(processedBody, {
        returning: ['id'],
        transaction,
      });

      if (newGenre) {
        await transaction.commit();
        const { id } = newGenre;
        res.status(201).json({
          id,
          ...processedBody,
        });
      }
      await transaction.rollback();
      next(createError(400, 'The genre has not been created!'));
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }

  static async updateGenre(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const {
        params: { genreId },
        body: { title, logo },
      } = req;

      const newBody = { title, logo };

      const replaceEmptyStringsWithNull = (obj) =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const [affectedRows, [updatedGenre]] = await Genre.update(processedBody, {
        where: {
          id: genreId,
        },
        returning: true,
        transaction,
      });
      console.log(`Count of patched rows: ${affectedRows}`);

      if (affectedRows > 0) {
        await transaction.commit();
        res.status(200).json(updatedGenre);
      } else {
        await transaction.rollback();
        next(createError(404, 'The genre has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }

  static async deleteGenre(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const {
        params: { genreId },
      } = req;

      const delGenre = await Genre.destroy({
        where: {
          id: genreId,
        },
        transaction,
      });

      if (delGenre) {
        await transaction.commit();
        res.sendStatus(res.statusCode);
      } else {
        await transaction.rollback();
        next(createError(400, 'The genre has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }
}

module.exports = GenresController;
