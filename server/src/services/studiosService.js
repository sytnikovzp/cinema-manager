const { Studio, Country, Location, Movie } = require('../db/models');

const { notFound, badRequest } = require('../errors/generalErrors');
const {
  formatDateTime,
  getRecordByTitle,
} = require('../utils/sharedFunctions');

const formatStudioData = (studio) => ({
  id: studio.id,
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
      attributes: ['id', 'title', 'foundationYear', 'logo'],
      raw: true,
      limit,
      offset,
      order: [['id', 'DESC']],
    });
    if (!foundStudios.length) {
      throw notFound('Studios not found');
    }
    const allStudios = foundStudios.map(
      ({ id, title, foundationYear, logo }) => ({
        id,
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

  static async getStudioById(id) {
    const foundStudio = await Studio.findByPk(id, {
      attributes: { exclude: ['locationId'] },
      include: [
        {
          model: Location,
          attributes: ['id', 'title'],
          include: [{ model: Country, attributes: ['id', 'title'] }],
        },
        {
          model: Movie,
          attributes: ['id', 'title'],
          through: { attributes: [] },
        },
      ],
    });
    if (!foundStudio) {
      throw notFound('Studio not found');
    }
    const studioData = {
      ...foundStudio.toJSON(),
      locationId: foundStudio.Location?.id || '',
      locationTitle: foundStudio.Location?.title || '',
      countryId: foundStudio.Location?.Country?.id || '',
      countryTitle: foundStudio.Location?.Country?.title || '',
    };
    return {
      ...formatStudioData(studioData),
      location: {
        id: studioData.locationId,
        title: studioData.locationTitle,
      },
      country: {
        id: studioData.countryId,
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
        locationId: locationRecord?.id || null,
      },
      { transaction, returning: true }
    );
    if (!newStudio) {
      throw badRequest('No data has been created for this studio');
    }
    return formatStudioData(newStudio);
  }

  static async updateStudio(
    id,
    title,
    locationValue,
    foundationYearValue,
    logoValue,
    aboutValue,
    transaction
  ) {
    const foundStudio = await Studio.findByPk(id);
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
        locationId: locationRecord?.id || null,
      },
      { where: { id }, returning: true, transaction }
    );
    if (!affectedRows) {
      throw badRequest('No data has been updated for this studio');
    }
    return formatStudioData(updatedStudio);
  }

  static async deleteStudio(id, transaction) {
    const foundStudio = await Studio.findByPk(id);
    if (!foundStudio) {
      throw notFound('Studio not found');
    }
    const deletedStudio = await Studio.destroy({
      where: { id },
      transaction,
    });
    if (!deletedStudio) {
      throw badRequest('No data has been deleted for this studio');
    }
    return deletedStudio;
  }
}

module.exports = StudiosService;
