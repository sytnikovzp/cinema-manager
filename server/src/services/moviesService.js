const { Movie, Actor, Director, Studio, Genre } = require('../db/models');

const { notFound, badRequest } = require('../errors/generalErrors');
const { formatDateTime } = require('../utils/dateHelpers');
const { getRecordByTitle } = require('../utils/sharedFunctions');
const { isValidUUID } = require('../utils/validators');

const formatMovieData = (movie) => ({
  uuid: movie.uuid,
  title: movie.title,
  releaseYear: movie.releaseYear || '',
  poster: movie.poster || '',
  trailer: movie.trailer || '',
  storyline: movie.storyline || '',
  studios: movie.Studios || [],
  directors: movie.Directors || [],
  actors: movie.Actors || [],
  createdAt: formatDateTime(movie.createdAt),
  updatedAt: formatDateTime(movie.updatedAt),
});

class MoviesService {
  static async getAllMovies(limit, offset) {
    const foundMovies = await Movie.findAll({
      attributes: ['uuid', 'title', 'releaseYear', 'poster'],
      raw: true,
      limit,
      offset,
      order: [['uuid', 'DESC']],
    });
    if (!foundMovies.length) {
      throw notFound('Movies not found');
    }
    const allMovies = foundMovies.map(
      ({ uuid, title, releaseYear, poster }) => ({
        uuid,
        title,
        releaseYear: releaseYear || '',
        poster: poster || '',
      })
    );
    const totalCount = await Movie.count();
    return {
      allMovies,
      totalCount,
    };
  }

  static async getMovieByUuid(uuid) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundMovie = await Movie.findByPk(uuid, {
      attributes: { exclude: ['genreUuid'] },
      include: [
        { model: Genre, attributes: ['uuid', 'title'] },
        {
          model: Actor,
          attributes: ['uuid', 'fullName'],
          through: { attributes: [] },
        },
        {
          model: Director,
          attributes: ['uuid', 'fullName'],
          through: { attributes: [] },
        },
        {
          model: Studio,
          attributes: ['uuid', 'title'],
          through: { attributes: [] },
        },
      ],
    });
    if (!foundMovie) {
      throw notFound('Movie not found');
    }
    const movieData = {
      ...foundMovie.toJSON(),
      genreUuid: foundMovie.Genre?.uuid || '',
      genreTitle: foundMovie.Genre?.title || '',
    };
    return {
      ...formatMovieData(movieData),
      genre: {
        uuid: movieData.genreUuid,
        title: movieData.genreTitle,
      },
    };
  }

  static async createMovie(
    title,
    genreValue,
    releaseYearValue,
    posterValue,
    trailerValue,
    storylineValue,
    studiosTitles,
    directorsFullNames,
    actorsFullNames,
    transaction
  ) {
    if (await Movie.findOne({ where: { title } })) {
      throw badRequest('This movie already exists');
    }
    const genreRecord = genreValue
      ? await getRecordByTitle(Genre, genreValue)
      : null;
    const allStudios = await Studio.findAll({ attributes: ['uuid', 'title'] });
    const foundStudios = allStudios.filter((studio) =>
      studiosTitles.includes(studio.title)
    );
    if (foundStudios.length !== studiosTitles.length) {
      const missingStudios = studiosTitles.filter(
        (title) => !foundStudios.some((studio) => studio.title === title)
      );
      throw notFound(
        `Some studios could not be found: ${missingStudios.join(', ')}`
      );
    }
    const allDirectors = await Director.findAll({
      attributes: ['uuid', 'fullName'],
    });
    const foundDirectors = allDirectors.filter((director) =>
      directorsFullNames.includes(director.fullName)
    );
    if (foundDirectors.length !== directorsFullNames.length) {
      const missingDirectors = directorsFullNames.filter(
        (fullName) =>
          !foundDirectors.some((director) => director.fullName === fullName)
      );
      throw notFound(
        `Some directors could not be found: ${missingDirectors.join(', ')}`
      );
    }
    const allActors = await Actor.findAll({
      attributes: ['uuid', 'fullName'],
    });
    const foundActors = allActors.filter((actor) =>
      actorsFullNames.includes(actor.fullName)
    );
    if (foundActors.length !== actorsFullNames.length) {
      const missingActors = actorsFullNames.filter(
        (fullName) => !foundActors.some((actor) => actor.fullName === fullName)
      );
      throw notFound(
        `Some actors could not be found: ${missingActors.join(', ')}`
      );
    }
    const newMovie = await Movie.create(
      {
        title,
        releaseYear: releaseYearValue || null,
        poster: posterValue || null,
        trailer: trailerValue || null,
        storyline: storylineValue || null,
        genreUuid: genreRecord?.uuid || null,
      },
      { transaction, returning: true }
    );
    if (!newMovie) {
      throw badRequest('No data has been created for this movie');
    }
    await newMovie.setStudios(foundStudios, { transaction });
    await newMovie.setDirectors(foundDirectors, { transaction });
    await newMovie.setActors(foundActors, { transaction });
    await newMovie.reload({
      include: [
        {
          model: Studio,
          attributes: ['uuid', 'title'],
          through: { attributes: [] },
        },
        {
          model: Director,
          attributes: ['uuid', 'fullName'],
          through: { attributes: [] },
        },
        {
          model: Actor,
          attributes: ['uuid', 'fullName'],
          through: { attributes: [] },
        },
      ],
      transaction,
    });
    return formatMovieData(newMovie);
  }

  static async updateMovie(
    uuid,
    title,
    genreValue,
    releaseYearValue,
    posterValue,
    trailerValue,
    storylineValue,
    studiosTitles,
    directorsFullNames,
    actorsFullNames,
    transaction
  ) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundMovie = await Movie.findByPk(uuid);
    if (!foundMovie) {
      throw notFound('Movie not found');
    }
    if (title && title !== foundMovie.title) {
      const duplicateMovie = await Movie.findOne({ where: { title } });
      if (duplicateMovie) {
        throw badRequest('This movie already exists');
      }
    }
    const genreRecord = genreValue
      ? await getRecordByTitle(Genre, genreValue)
      : null;
    const allStudios = await Studio.findAll({ attributes: ['uuid', 'title'] });
    const foundStudios = allStudios.filter((studio) =>
      studiosTitles.includes(studio.title)
    );
    if (foundStudios.length !== studiosTitles.length) {
      const missingStudios = studiosTitles.filter(
        (title) => !foundStudios.some((studio) => studio.title === title)
      );
      throw notFound(
        `Some studios could not be found: ${missingStudios.join(', ')}`
      );
    }
    const allDirectors = await Director.findAll({
      attributes: ['uuid', 'fullName'],
    });
    const foundDirectors = allDirectors.filter((director) =>
      directorsFullNames.includes(director.fullName)
    );
    if (foundDirectors.length !== directorsFullNames.length) {
      const missingDirectors = directorsFullNames.filter(
        (fullName) =>
          !foundDirectors.some((director) => director.fullName === fullName)
      );
      throw notFound(
        `Some directors could not be found: ${missingDirectors.join(', ')}`
      );
    }
    const allActors = await Actor.findAll({
      attributes: ['uuid', 'fullName'],
    });
    const foundActors = allActors.filter((actor) =>
      actorsFullNames.includes(actor.fullName)
    );
    if (foundActors.length !== actorsFullNames.length) {
      const missingActors = actorsFullNames.filter(
        (fullName) => !foundActors.some((actor) => actor.fullName === fullName)
      );
      throw notFound(
        `Some actors could not be found: ${missingActors.join(', ')}`
      );
    }
    const [affectedRows, [updatedMovie]] = await Movie.update(
      {
        title,
        releaseYear: releaseYearValue || null,
        poster: posterValue || null,
        trailer: trailerValue || null,
        storyline: storylineValue || null,
        genreUuid: genreRecord?.uuid || null,
      },
      { where: { uuid }, returning: true, transaction }
    );
    if (!affectedRows) {
      throw badRequest('No data has been updated for this movie');
    }
    await updatedMovie.setStudios(foundStudios, { transaction });
    await updatedMovie.setDirectors(foundDirectors, { transaction });
    await updatedMovie.setActors(foundActors, { transaction });
    await updatedMovie.reload({
      include: [
        {
          model: Studio,
          attributes: ['uuid', 'title'],
          through: { attributes: [] },
        },
        {
          model: Director,
          attributes: ['uuid', 'fullName'],
          through: { attributes: [] },
        },
        {
          model: Actor,
          attributes: ['uuid', 'fullName'],
          through: { attributes: [] },
        },
      ],
      transaction,
    });
    return formatMovieData(updatedMovie);
  }

  static async deleteMovie(uuid, transaction) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundMovie = await Movie.findByPk(uuid);
    if (!foundMovie) {
      throw notFound('Movie not found');
    }
    const deletedMovie = await Movie.destroy({
      where: { uuid },
      transaction,
    });
    if (!deletedMovie) {
      throw badRequest('No data has been deleted for this movie');
    }
    return deletedMovie;
  }
}

module.exports = MoviesService;
