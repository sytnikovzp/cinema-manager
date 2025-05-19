const { Director, Country, Movie } = require('../db/models');

const { notFound, badRequest } = require('../errors/generalErrors');
const {
  formatDateTime,
  getRecordByTitle,
  formatDate,
  parseAndValidateDate,
} = require('../utils/sharedFunctions');
const { isValidUUID } = require('../utils/validators');

const formatDirectorData = (director) => ({
  uuid: director.uuid,
  fullName: director.fullName,
  birthDate: formatDate(director.birthDate) || '',
  deathDate: formatDate(director.deathDate) || '',
  photo: director.photo || '',
  biography: director.biography || '',
  movies: director.Movies || [],
  createdAt: formatDateTime(director.createdAt),
  updatedAt: formatDateTime(director.updatedAt),
});

class DirectorsService {
  static async getAllDirectors(limit, offset) {
    const foundDirectors = await Director.findAll({
      attributes: ['uuid', 'fullName', 'photo'],
      include: [{ model: Country, attributes: ['title'] }],
      raw: true,
      limit,
      offset,
      order: [['uuid', 'DESC']],
    });
    if (!foundDirectors.length) {
      throw notFound('Directors not found');
    }
    const allDirectors = foundDirectors.map(
      ({ uuid, fullName, photo, 'Country.title': countryTitle }) => ({
        uuid,
        fullName,
        country: countryTitle || '',
        photo: photo || '',
      })
    );
    const totalCount = await Director.count();
    return {
      allDirectors,
      totalCount,
    };
  }

  static async getDirectorByUuid(uuid) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundDirector = await Director.findByPk(uuid, {
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
    if (!foundDirector) {
      throw notFound('Director not found');
    }
    const directorData = {
      ...foundDirector.toJSON(),
      countryUuid: foundDirector.Country?.uuid || '',
      countryTitle: foundDirector.Country?.title || '',
    };
    return {
      ...formatDirectorData(directorData),
      country: {
        uuid: directorData.countryUuid,
        title: directorData.countryTitle,
      },
    };
  }

  static async createDirector(
    fullName,
    countryValue,
    birthDateValue,
    deathDateValue,
    photoValue,
    biographyValue,
    transaction
  ) {
    if (await Director.findOne({ where: { fullName } })) {
      throw badRequest('This director already exists');
    }
    const countryRecord = countryValue
      ? await getRecordByTitle(Country, countryValue)
      : null;
    const birthDate = parseAndValidateDate(birthDateValue);
    const deathDate = parseAndValidateDate(deathDateValue);
    const newDirector = await Director.create(
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
    if (!newDirector) {
      throw badRequest('No data has been created for this director');
    }
    return formatDirectorData(newDirector);
  }

  static async updateDirector(
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
    const foundDirector = await Director.findByPk(uuid);
    if (!foundDirector) {
      throw notFound('Director not found');
    }
    if (fullName && fullName !== foundDirector.fullName) {
      const duplicateDirector = await Director.findOne({ where: { fullName } });
      if (duplicateDirector) {
        throw badRequest('This director already exists');
      }
    }
    const countryRecord = countryValue
      ? await getRecordByTitle(Country, countryValue)
      : null;
    const birthDate = parseAndValidateDate(birthDateValue);
    const deathDate = parseAndValidateDate(deathDateValue);
    const [affectedRows, [updatedDirector]] = await Director.update(
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
      throw badRequest('No data has been updated for this director');
    }
    return formatDirectorData(updatedDirector);
  }

  static async deleteDirector(uuid, transaction) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundDirector = await Director.findByPk(uuid);
    if (!foundDirector) {
      throw notFound('Director not found');
    }
    const deletedDirector = await Director.destroy({
      where: { uuid },
      transaction,
    });
    if (!deletedDirector) {
      throw badRequest('No data has been deleted for this director');
    }
    return deletedDirector;
  }
}

module.exports = DirectorsService;
