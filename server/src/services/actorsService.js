const { Actor, Country, Movie } = require('../db/models');

const { notFound, badRequest } = require('../errors/generalErrors');
const {
  formatDateTime,
  formatDate,
  parseAndValidateDate,
} = require('../utils/dateHelpers');
const { getRecordByTitle } = require('../utils/sharedFunctions');
const { isValidUUID } = require('../utils/validators');

const formatActorData = (actor) => ({
  uuid: actor.uuid,
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
      attributes: ['uuid', 'fullName', 'photo'],
      include: [{ model: Country, attributes: ['title'] }],
      raw: true,
      limit,
      offset,
      order: [['uuid', 'DESC']],
    });
    if (!foundActors.length) {
      throw notFound('Actors not found');
    }
    const allActors = foundActors.map(
      ({ uuid, fullName, photo, 'Country.title': countryTitle }) => ({
        uuid,
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

  static async getActorByUuid(uuid) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundActor = await Actor.findByPk(uuid, {
      attributes: { exclude: ['countryUuid'] },
      include: [
        { model: Country, attributes: ['uuid', 'title'] },
        {
          model: Movie,
          attributes: ['uuid', 'title'],
          through: { attributes: [] },
        },
      ],
    });
    if (!foundActor) {
      throw notFound('Actor not found');
    }
    const actorData = {
      ...foundActor.toJSON(),
      countryUuid: foundActor.Country?.uuid || '',
      countryTitle: foundActor.Country?.title || '',
    };
    return {
      ...formatActorData(actorData),
      country: {
        uuid: actorData.countryUuid,
        title: actorData.countryTitle,
      },
    };
  }

  static async createActor(
    fullName,
    countryValue,
    birthDateValue,
    deathDateValue,
    photoValue,
    biographyValue,
    transaction
  ) {
    if (await Actor.findOne({ where: { fullName } })) {
      throw badRequest('This actor already exists');
    }
    const countryRecord = countryValue
      ? await getRecordByTitle(Country, countryValue)
      : null;
    const birthDate = parseAndValidateDate(birthDateValue);
    const deathDate = parseAndValidateDate(deathDateValue);
    const newActor = await Actor.create(
      {
        fullName,
        birthDate,
        deathDate,
        photo: photoValue || null,
        biography: biographyValue || null,
        countryUuid: countryRecord?.uuid || null,
      },
      { transaction, returning: true }
    );
    if (!newActor) {
      throw badRequest('No data has been created for this actor');
    }
    return formatActorData(newActor);
  }

  static async updateActor(
    uuid,
    fullName,
    countryValue,
    birthDateValue,
    deathDateValue,
    photoValue,
    biographyValue,
    transaction
  ) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundActor = await Actor.findByPk(uuid);
    if (!foundActor) {
      throw notFound('Actor not found');
    }
    if (fullName && fullName !== foundActor.fullName) {
      const duplicateActor = await Actor.findOne({ where: { fullName } });
      if (duplicateActor) {
        throw badRequest('This actor already exists');
      }
    }
    const countryRecord = countryValue
      ? await getRecordByTitle(Country, countryValue)
      : null;
    const birthDate = parseAndValidateDate(birthDateValue);
    const deathDate = parseAndValidateDate(deathDateValue);
    const [affectedRows, [updatedActor]] = await Actor.update(
      {
        fullName,
        birthDate,
        deathDate,
        photo: photoValue || null,
        biography: biographyValue || null,
        countryUuid: countryRecord?.uuid || null,
      },
      { where: { uuid }, returning: true, transaction }
    );
    if (!affectedRows) {
      throw badRequest('No data has been updated for this actor');
    }
    return formatActorData(updatedActor);
  }

  static async deleteActor(uuid, transaction) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundActor = await Actor.findByPk(uuid);
    if (!foundActor) {
      throw notFound('Actor not found');
    }
    const deletedActor = await Actor.destroy({
      where: { uuid },
      transaction,
    });
    if (!deletedActor) {
      throw badRequest('No data has been deleted for this actor');
    }
    return deletedActor;
  }
}

module.exports = ActorsService;
