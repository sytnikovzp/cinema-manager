const { Movie, Actor, Director, Studio, Genre } = require('../db/models');

const { notFound, badRequest } = require('../errors/generalErrors');
const {
  formatDateTime,
  getRecordByTitle,
} = require('../utils/sharedFunctions');

const formatMovieData = (movie) => ({
  id: movie.id,
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
      attributes: ['id', 'title', 'releaseYear', 'poster'],
      raw: true,
      limit,
      offset,
      order: [['id', 'DESC']],
    });
    if (!foundMovies.length) {
      throw notFound('Movies not found');
    }
    const allMovies = foundMovies.map(({ id, title, releaseYear, poster }) => ({
      id,
      title,
      releaseYear: releaseYear || '',
      poster: poster || '',
    }));
    const totalCount = await Movie.count();
    return {
      allMovies,
      totalCount,
    };
  }

  static async getMovieById(id) {
    const foundMovie = await Movie.findByPk(id, {
      attributes: { exclude: ['genreId'] },
      include: [
        { model: Genre, attributes: ['id', 'title'] },
        {
          model: Actor,
          attributes: ['id', 'fullName'],
          through: { attributes: [] },
        },
        {
          model: Director,
          attributes: ['id', 'fullName'],
          through: { attributes: [] },
        },
        {
          model: Studio,
          attributes: ['id', 'title'],
          through: { attributes: [] },
        },
      ],
    });
    if (!foundMovie) {
      throw notFound('Movie not found');
    }
    const movieData = {
      ...foundMovie.toJSON(),
      genreId: foundMovie.Genre?.id || '',
      genreTitle: foundMovie.Genre?.title || '',
    };
    return {
      ...formatMovieData(movieData),
      genre: {
        id: movieData.genreId,
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
    const allStudios = await Studio.findAll({ attributes: ['id', 'title'] });
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
      attributes: ['id', 'fullName'],
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
      attributes: ['id', 'fullName'],
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
        genreId: genreRecord?.id || null,
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
          attributes: ['id', 'title'],
          through: { attributes: [] },
        },
        {
          model: Director,
          attributes: ['id', 'fullName'],
          through: { attributes: [] },
        },
        {
          model: Actor,
          attributes: ['id', 'fullName'],
          through: { attributes: [] },
        },
      ],
      transaction,
    });
    return formatMovieData(newMovie);
  }

  static async updateMovie(
    id,
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
    const foundMovie = await Movie.findByPk(id);
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
    const allStudios = await Studio.findAll({ attributes: ['id', 'title'] });
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
      attributes: ['id', 'fullName'],
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
      attributes: ['id', 'fullName'],
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
        genreId: genreRecord?.id || null,
      },
      { where: { id }, returning: true, transaction }
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
          attributes: ['id', 'title'],
          through: { attributes: [] },
        },
        {
          model: Director,
          attributes: ['id', 'fullName'],
          through: { attributes: [] },
        },
        {
          model: Actor,
          attributes: ['id', 'fullName'],
          through: { attributes: [] },
        },
      ],
      transaction,
    });
    return formatMovieData(updatedMovie);
  }

  static async deleteMovie(id, transaction) {
    const foundMovie = await Movie.findByPk(id);
    if (!foundMovie) {
      throw notFound('Movie not found');
    }
    const deletedMovie = await Movie.destroy({
      where: { id },
      transaction,
    });
    if (!deletedMovie) {
      throw badRequest('No data has been deleted for this movie');
    }
    return deletedMovie;
  }
}

module.exports = MoviesService;
