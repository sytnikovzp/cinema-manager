const createError = require('http-errors');
const moment = require('moment');

const {
  Actor,
  Director,
  Movie,
  Studio,
  Genre,
  sequelize,
} = require('../db/models');

class MovieController {
  async getMovies(req, res, next) {
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

      const formattedMovies = movies.map((movie) => {
        return {
          id: movie.id,
          title: movie.title || '',
          releaseYear: movie.releaseYear || '',
          poster: movie.poster || '',
        };
      });

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

  async getMovieById(req, res, next) {
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
          createdAt: moment(movieData.createdAt).format('DD-MM-YYYY HH:mm'),
          updatedAt: moment(movieData.updatedAt).format('DD-MM-YYYY HH:mm'),
        };

        delete formattedMovie.Genre;
        delete formattedMovie.Actors;
        delete formattedMovie.Directors;
        delete formattedMovie.Studios;

        res.status(200).json(formattedMovie);
      } else {
        console.log('Movie not found!');
        next(createError(404, 'Movie not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createMovie(req, res, next) {
    const t = await sequelize.transaction();

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
      console.log('Actors Id`s:', actorRecords);

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
      console.log('Directors Id`s:', directorRecords);

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
      console.log('Studios Id`s:', studioRecords);

      const newBody = {
        title,
        genreId,
        releaseYear,
        poster,
        trailer,
        storyline,
      };

      const replaceEmptyStringsWithNull = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );
      };

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const newMovie = await Movie.create(processedBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newMovie) {
        if (actorRecords.length > 0) {
          await newMovie.addActors(
            actorRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        if (directorRecords.length > 0) {
          await newMovie.addDirectors(
            directorRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        if (studioRecords.length > 0) {
          await newMovie.addStudios(
            studioRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        await t.commit();
        const { id } = newMovie;
        return res.status(201).json({
          id,
          ...processedBody,
        });
      } else {
        await t.rollback();
        console.log('The movie has not been created!');
        next(createError(400, 'The movie has not been created!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateMovie(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        id,
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
      console.log('Actors Id`s:', actorRecords);

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
      console.log('Directors Id`s:', directorRecords);

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
      console.log('Studios Id`s:', studioRecords);

      const newBody = {
        title,
        genreId,
        releaseYear,
        poster,
        trailer,
        storyline,
      };

      const replaceEmptyStringsWithNull = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );
      };

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const [affectedRows, [updatedMovie]] = await Movie.update(processedBody, {
        where: { id },
        returning: true,
        transaction: t,
      });

      if (affectedRows > 0) {
        const movieInstance = await Movie.findByPk(id, { transaction: t });

        if (actorRecords.length > 0) {
          await movieInstance.setActors(
            actorRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        if (directorRecords.length > 0) {
          await movieInstance.setDirectors(
            directorRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        if (studioRecords.length > 0) {
          await movieInstance.setStudios(
            studioRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        await t.commit();
        res.status(201).json(updatedMovie);
      } else {
        await t.rollback();
        console.log('The movie has not been updated!');
        next(createError(400, 'The movie has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async patchMovie(req, res, next) {
    const t = await sequelize.transaction();

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
      if (genre !== undefined) {
        if (genre !== '') {
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

      console.log('Actors Id`s:', actorRecords);

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

      console.log('Directors Id`s:', directorRecords);

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

      console.log('Studios Id`s:', studioRecords);

      const newBody = {
        title,
        genreId,
        releaseYear,
        poster,
        trailer,
        storyline,
      };

      const replaceEmptyStringsWithNull = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );
      };

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const [affectedRows, [updatedMovie]] = await Movie.update(processedBody, {
        where: { id: movieId },
        returning: true,
        transaction: t,
      });

      console.log(`Count of patched rows: ${affectedRows}`);

      if (affectedRows > 0) {
        const movieInstance = await Movie.findByPk(movieId, { transaction: t });

        if (actors && actorRecords.length > 0) {
          await movieInstance.setActors(
            actorRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        if (directors && directorRecords.length > 0) {
          await movieInstance.setDirectors(
            directorRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        if (studios && studioRecords.length > 0) {
          await movieInstance.setStudios(
            studioRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        await t.commit();
        return res.status(200).json(updatedMovie);
      } else {
        await t.rollback();
        console.log('The movie has not been updated!');
        next(createError(404, 'The movie has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async deleteMovie(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { movieId },
      } = req;

      const delMovie = await Movie.destroy({
        where: {
          id: movieId,
        },
        transaction: t,
      });

      if (delMovie) {
        await t.commit();
        res.sendStatus(res.statusCode);
      } else {
        await t.rollback();
        console.log('The movie has not been deleted!');
        next(createError(400, 'The movie has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new MovieController();
