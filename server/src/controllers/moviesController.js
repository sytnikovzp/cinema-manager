const createError = require('http-errors');

const {
  Actor,
  Director,
  Movie,
  Studio,
  Genre,
  sequelize,
} = require('../db/models');

const { formatDateTime } = require('../utils/sharedFunctions');

class MoviesController {
  static async getAllMovies(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const movies = await Movie.findAll({
        attributes: ['id', 'title', 'releaseYear', 'poster'],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });

      const moviesCount = await Movie.count();

      const formattedMovies = movies.map((movie) => ({
        id: movie.id,
        title: movie.title || '',
        releaseYear: movie.releaseYear || '',
        poster: movie.poster || '',
      }));

      if (formattedMovies.length > 0) {
        res.status(200).set('X-Total-Count', moviesCount).json(formattedMovies);
      } else {
        next(createError(404, 'Movies not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async getMovieById(req, res, next) {
    try {
      const {
        params: { movieId },
      } = req;

      const movieById = await Movie.findByPk(movieId, {
        attributes: {
          exclude: ['genreId'],
        },
        include: [
          {
            model: Genre,
            attributes: ['title'],
          },
          {
            model: Actor,
            attributes: ['id', 'fullName'],
            through: {
              attributes: [],
            },
          },
          {
            model: Director,
            attributes: ['id', 'fullName'],
            through: {
              attributes: [],
            },
          },
          {
            model: Studio,
            attributes: ['id', 'title'],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (movieById) {
        const movieData = movieById.toJSON();
        const formattedMovie = {
          ...movieData,
          title: movieData.title || '',
          releaseYear: movieData.releaseYear || '',
          poster: movieData.poster || '',
          trailer: movieData.trailer || '',
          storyline: movieData.storyline || '',
          genre: movieData.Genre ? movieData.Genre.title : '',
          studios: movieData.Studios || [],
          directors: movieData.Directors || [],
          actors: movieData.Actors || [],
          createdAt: formatDateTime(movieData.createdAt),
          updatedAt: formatDateTime(movieData.updatedAt),
        };

        delete formattedMovie.Genre;
        delete formattedMovie.Actors;
        delete formattedMovie.Directors;
        delete formattedMovie.Studios;

        res.status(200).json(formattedMovie);
      } else {
        next(createError(404, 'Movie not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async createMovie(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const {
        title,
        genre,
        releaseYear,
        poster,
        trailer,
        storyline,
        actors,
        directors,
        studios,
      } = req.body;

      const genreValue = genre === '' ? null : genre;

      const genreRecord = genreValue
        ? await Genre.findOne({
            where: { title: genreValue },
            attributes: ['id'],
            raw: true,
          })
        : null;

      if (genreValue && !genreRecord) {
        throw new Error('Genre not found');
      }

      const genreId = genreRecord ? genreRecord.id : null;

      const actorRecords = await Promise.all(
        actors.map(async (fullName) => {
          const actor = await Actor.findOne({
            where: { fullName },
            attributes: ['id'],
            raw: true,
          });
          return actor ? actor.id : null;
        })
      );

      const directorRecords = await Promise.all(
        directors.map(async (fullName) => {
          const director = await Director.findOne({
            where: { fullName },
            attributes: ['id'],
            raw: true,
          });
          return director ? director.id : null;
        })
      );

      const studioRecords = await Promise.all(
        studios.map(async (title) => {
          const studio = await Studio.findOne({
            where: { title },
            attributes: ['id'],
            raw: true,
          });
          return studio ? studio.id : null;
        })
      );

      const newBody = {
        title,
        genreId,
        releaseYear,
        poster,
        trailer,
        storyline,
      };

      const replaceEmptyStringsWithNull = (obj) =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const newMovie = await Movie.create(processedBody, {
        returning: ['id'],
        transaction,
      });

      if (newMovie) {
        if (actorRecords.length > 0) {
          await newMovie.addActors(
            actorRecords.filter((id) => id !== null),
            { transaction }
          );
        }

        if (directorRecords.length > 0) {
          await newMovie.addDirectors(
            directorRecords.filter((id) => id !== null),
            { transaction }
          );
        }

        if (studioRecords.length > 0) {
          await newMovie.addStudios(
            studioRecords.filter((id) => id !== null),
            { transaction }
          );
        }

        await transaction.commit();
        const { id } = newMovie;
        res.status(201).json({
          id,
          ...processedBody,
        });
      }
      await transaction.rollback();
      next(createError(400, 'The movie has not been created!'));
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }

  static async updateMovie(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const {
        params: { movieId },
        body: {
          title,
          genre,
          releaseYear,
          poster,
          trailer,
          storyline,
          actors,
          directors,
          studios,
        },
      } = req;

      let genreId = null;
      if (genre && genre !== '') {
        const genreRecord = await Genre.findOne({
          where: {
            title: genre,
          },
          attributes: ['id'],
          raw: true,
        });

        if (!genreRecord) {
          throw new Error('Genre not found');
        }

        genreId = genreRecord.id;
      }

      const actorRecords = actors
        ? await Promise.all(
            actors.map(async (fullName) => {
              const actor = await Actor.findOne({
                where: { fullName },
                attributes: ['id'],
                raw: true,
              });
              return actor ? actor.id : null;
            })
          )
        : [];

      const directorRecords = directors
        ? await Promise.all(
            directors.map(async (fullName) => {
              const director = await Director.findOne({
                where: { fullName },
                attributes: ['id'],
                raw: true,
              });
              return director ? director.id : null;
            })
          )
        : [];

      const studioRecords = studios
        ? await Promise.all(
            studios.map(async (title) => {
              const studio = await Studio.findOne({
                where: { title },
                attributes: ['id'],
                raw: true,
              });
              return studio ? studio.id : null;
            })
          )
        : [];

      const newBody = {
        title,
        genreId,
        releaseYear,
        poster,
        trailer,
        storyline,
      };

      const replaceEmptyStringsWithNull = (obj) =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const [affectedRows, [updatedMovie]] = await Movie.update(processedBody, {
        where: { id: movieId },
        returning: true,
        transaction,
      });

      console.log(`Count of patched rows: ${affectedRows}`);

      if (affectedRows > 0) {
        const movieInstance = await Movie.findByPk(movieId, {
          transaction,
        });

        if (actors && actorRecords.length > 0) {
          await movieInstance.setActors(
            actorRecords.filter((id) => id !== null),
            { transaction }
          );
        }

        if (directors && directorRecords.length > 0) {
          await movieInstance.setDirectors(
            directorRecords.filter((id) => id !== null),
            { transaction }
          );
        }

        if (studios && studioRecords.length > 0) {
          await movieInstance.setStudios(
            studioRecords.filter((id) => id !== null),
            { transaction }
          );
        }

        await transaction.commit();
        res.status(200).json(updatedMovie);
      }
      await transaction.rollback();
      next(createError(404, 'The movie has not been updated!'));
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }

  static async deleteMovie(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
      const {
        params: { movieId },
      } = req;

      const delMovie = await Movie.destroy({
        where: {
          id: movieId,
        },
        transaction,
      });

      if (delMovie) {
        await transaction.commit();
        res.sendStatus(res.statusCode);
      } else {
        await transaction.rollback();
        next(createError(400, 'The movie has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      next(error);
    }
  }
}

module.exports = MoviesController;
