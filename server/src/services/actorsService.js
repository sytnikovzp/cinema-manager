const { Actor, Country, Movie } = require('../db/models');

const { notFound, badRequest } = require('../errors/generalErrors');
const {
  formatDateTime,
  getRecordByTitle,
  formatDate,
  parseAndValidateDate,
} = require('../utils/sharedFunctions');

const formatActorData = (actor) => ({
  id: actor.id,
  fullName: actor.fullName,
  birthDate: formatDate(actor.birthDate) || '',
  deathDate: formatDate(actor.deathDate) || '',
  photo: actor.photo || '',
  biography: actor.biography || '',
  movies: actor.Movies || [],
  createdAt: formatDateTime(actor.createdAt),
  updatedAt: formatDateTime(actor.updatedAt),
});

class ActorsService {
  static async getAllActors(limit, offset) {
    const foundActors = await Actor.findAll({
      attributes: ['id', 'fullName', 'photo'],
      include: [{ model: Country, attributes: ['title'] }],
      raw: true,
      limit,
      offset,
      order: [['id', 'DESC']],
    });
    if (!foundActors.length) {
      throw notFound('Actors not found');
    }
    const allActors = foundActors.map(
      ({ id, fullName, photo, 'Country.title': countryTitle }) => ({
        id,
        fullName,
        country: countryTitle || '',
        photo: photo || '',
      })
    );
    const totalCount = await Actor.count();
    return {
      allActors,
      totalCount,
    };
  }

  static async getActorById(id) {
    const foundActor = await Actor.findByPk(id, {
      attributes: { exclude: ['countryId'] },
      include: [
        { model: Country, attributes: ['id', 'title'] },
        {
          model: Movie,
          attributes: ['id', 'title'],
          through: { attributes: [] },
        },
      ],
    });
    if (!foundActor) {
      throw notFound('Actor not found');
    }
    const actorData = {
      ...foundActor.toJSON(),
      countryId: foundActor.Country?.id || '',
      countryTitle: foundActor.Country?.title || '',
    };
    return {
      ...formatActorData(actorData),
      country: {
        id: actorData.countryId,
        title: actorData.countryTitle,
      },
    };
  }

  static async createActor(
    fullName,
    country,
    birthDateValue,
    deathDateValue,
    photo,
    biography,
    transaction
  ) {
    if (await Actor.findOne({ where: { fullName } })) {
      throw badRequest('This actor already exists');
    }
    const countryRecord = country
      ? await getRecordByTitle(Country, country)
      : null;
    const birthDate = parseAndValidateDate(birthDateValue);
    const deathDate = parseAndValidateDate(deathDateValue);
    const newActor = await Actor.create(
      {
        fullName,
        birthDate,
        deathDate,
        photo: photo || null,
        biography: biography || null,
        countryId: countryRecord?.id || null,
      },
      { transaction, returning: true }
    );
    if (!newActor) {
      throw badRequest('No data has been created for this actor');
    }
    return formatActorData(newActor);
  }

  static async updateActor(
    id,
    fullName,
    country,
    birthDateValue,
    deathDateValue,
    photo,
    biography,
    transaction
  ) {
    const foundActor = await Actor.findByPk(id);
    if (!foundActor) {
      throw notFound('Actor not found');
    }
    if (fullName && fullName !== foundActor.fullName) {
      const duplicateActor = await Actor.findOne({ where: { fullName } });
      if (duplicateActor) {
        throw badRequest('This actor already exists');
      }
    }
    const countryRecord = country
      ? await getRecordByTitle(Country, country)
      : null;
    const birthDate = parseAndValidateDate(birthDateValue);
    const deathDate = parseAndValidateDate(deathDateValue);
    const [affectedRows, [updatedActor]] = await Actor.update(
      {
        fullName,
        birthDate,
        deathDate,
        photo: photo || null,
        biography: biography || null,
        countryId: countryRecord?.id || null,
      },
      { where: { id }, returning: true, transaction }
    );
    if (!affectedRows) {
      throw badRequest('No data has been updated for this actor');
    }
    return formatActorData(updatedActor);
  }

  static async deleteActor(id, transaction) {
    const foundActor = await Actor.findByPk(id);
    if (!foundActor) {
      throw notFound('Actor not found');
    }
    const deletedActor = await Actor.destroy({
      where: { id },
      transaction,
    });
    if (!deletedActor) {
      throw badRequest('No data has been deleted for this actor');
    }
    return deletedActor;
  }
}

module.exports = ActorsService;
