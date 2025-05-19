const { Studio, Country, Location, Movie } = require('../db/models');

const { notFound, badRequest } = require('../errors/generalErrors');
const {
  formatDateTime,
  getRecordByTitle,
} = require('../utils/sharedFunctions');
const { isValidUUID } = require('../utils/validators');

const formatStudioData = (studio) => ({
  uuid: studio.uuid,
  title: studio.title,
  foundationYear: studio.foundationYear || '',
  logo: studio.logo || '',
  about: studio.about || '',
  movies: studio.Movies || [],
  createdAt: formatDateTime(studio.createdAt),
  updatedAt: formatDateTime(studio.updatedAt),
});

class StudiosService {
  static async getAllStudios(limit, offset) {
    const foundStudios = await Studio.findAll({
      attributes: ['uuid', 'title', 'foundationYear', 'logo'],
      raw: true,
      limit,
      offset,
      order: [['uuid', 'DESC']],
    });
    if (!foundStudios.length) {
      throw notFound('Studios not found');
    }
    const allStudios = foundStudios.map(
      ({ uuid, title, foundationYear, logo }) => ({
        uuid,
        title,
        foundationYear: foundationYear || '',
        logo: logo || '',
      })
    );
    const totalCount = await Studio.count();
    return {
      allStudios,
      totalCount,
    };
  }

  static async getStudioByUuid(uuid) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundStudio = await Studio.findByPk(uuid, {
      attributes: { exclude: ['locationUuid'] },
      include: [
        {
          model: Location,
          attributes: ['uuid', 'title'],
          include: [{ model: Country, attributes: ['uuid', 'title'] }],
        },
        {
          model: Movie,
          attributes: ['uuid', 'title'],
          through: { attributes: [] },
        },
      ],
    });
    if (!foundStudio) {
      throw notFound('Studio not found');
    }
    const studioData = {
      ...foundStudio.toJSON(),
      locationUuid: foundStudio.Location?.uuid || '',
      locationTitle: foundStudio.Location?.title || '',
      countryUuid: foundStudio.Location?.Country?.uuid || '',
      countryTitle: foundStudio.Location?.Country?.title || '',
    };
    return {
      ...formatStudioData(studioData),
      location: {
        uuid: studioData.locationUuid,
        title: studioData.locationTitle,
      },
      country: {
        uuid: studioData.countryUuid,
        title: studioData.countryTitle,
      },
    };
  }

  static async createStudio(
    title,
    locationValue,
    foundationYearValue,
    logoValue,
    aboutValue,
    transaction
  ) {
    if (await Studio.findOne({ where: { title } })) {
      throw badRequest('This studio already exists');
    }
    const locationRecord = locationValue
      ? await getRecordByTitle(Location, locationValue)
      : null;
    const newStudio = await Studio.create(
      {
        title,
        foundationYear: foundationYearValue || null,
        logo: logoValue || null,
        about: aboutValue || null,
        locationUuid: locationRecord?.uuid || null,
      },
      { transaction, returning: true }
    );
    if (!newStudio) {
      throw badRequest('No data has been created for this studio');
    }
    return formatStudioData(newStudio);
  }

  static async updateStudio(
    uuid,
    title,
    locationValue,
    foundationYearValue,
    logoValue,
    aboutValue,
    transaction
  ) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundStudio = await Studio.findByPk(uuid);
    if (!foundStudio) {
      throw notFound('Studio not found');
    }
    if (title && title !== foundStudio.title) {
      const duplicateStudio = await Studio.findOne({ where: { title } });
      if (duplicateStudio) {
        throw badRequest('This studio already exists');
      }
    }
    const locationRecord = locationValue
      ? await getRecordByTitle(Location, locationValue)
      : null;
    const [affectedRows, [updatedStudio]] = await Studio.update(
      {
        title,
        foundationYear: foundationYearValue || null,
        logo: logoValue || null,
        about: aboutValue || null,
        locationUuid: locationRecord?.uuid || null,
      },
      { where: { uuid }, returning: true, transaction }
    );
    if (!affectedRows) {
      throw badRequest('No data has been updated for this studio');
    }
    return formatStudioData(updatedStudio);
  }

  static async deleteStudio(uuid, transaction) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundStudio = await Studio.findByPk(uuid);
    if (!foundStudio) {
      throw notFound('Studio not found');
    }
    const deletedStudio = await Studio.destroy({
      where: { uuid },
      transaction,
    });
    if (!deletedStudio) {
      throw badRequest('No data has been deleted for this studio');
    }
    return deletedStudio;
  }
}

module.exports = StudiosService;
