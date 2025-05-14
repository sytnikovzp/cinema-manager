const { Location, Country } = require('../db/models');

const { notFound, badRequest } = require('../errors/generalErrors');
const {
  formatDateTime,
  getRecordByTitle,
} = require('../utils/sharedFunctions');

const formatLocationData = (location) => ({
  id: location.id,
  title: location.title,
  coatOfArms: location.coatOfArms || '',
  createdAt: formatDateTime(location.createdAt),
  updatedAt: formatDateTime(location.updatedAt),
});

class LocationsService {
  static async getAllLocations(limit, offset) {
    const foundLocations = await Location.findAll({
      attributes: ['id', 'title', 'coatOfArms'],
      include: [{ model: Country, attributes: ['title'] }],
      raw: true,
      limit,
      offset,
      order: [['id', 'DESC']],
    });
    if (!foundLocations.length) {
      throw notFound('Locations not found');
    }
    const allLocations = foundLocations.map(
      ({ id, title, coatOfArms, 'Country.title': countryTitle }) => ({
        id,
        title,
        country: countryTitle || '',
        coatOfArms: coatOfArms || '',
      })
    );
    const totalCount = await Location.count();
    return {
      allLocations,
      totalCount,
    };
  }

  static async getLocationById(id) {
    const foundLocation = await Location.findByPk(id, {
      attributes: { exclude: ['countryId'] },
      include: [{ model: Country, attributes: ['id', 'title'] }],
    });
    if (!foundLocation) {
      throw notFound('Location not found');
    }
    const locationData = {
      ...foundLocation.toJSON(),
      countryId: foundLocation.Country?.id || '',
      countryTitle: foundLocation.Country?.title || '',
    };
    return {
      ...formatLocationData(locationData),
      country: {
        id: locationData.countryId,
        title: locationData.countryTitle,
      },
    };
  }

  static async createLocation(
    title,
    countryValue,
    coatOfArmsValue,
    transaction
  ) {
    if (await Location.findOne({ where: { title } })) {
      throw badRequest('This location already exists');
    }
    const countryRecord = countryValue
      ? await getRecordByTitle(Country, countryValue)
      : null;
    const newLocation = await Location.create(
      {
        title,
        countryId: countryRecord?.id || null,
        coatOfArms: coatOfArmsValue || null,
      },
      { transaction, returning: true }
    );
    if (!newLocation) {
      throw badRequest('No data has been created for this location');
    }
    return formatLocationData(newLocation);
  }

  static async updateLocation(
    id,
    title,
    countryValue,
    coatOfArmsValue,
    transaction
  ) {
    const foundLocation = await Location.findByPk(id);
    if (!foundLocation) {
      throw notFound('Location not found');
    }
    if (title && title !== foundLocation.title) {
      const duplicateLocation = await Location.findOne({ where: { title } });
      if (duplicateLocation) {
        throw badRequest('This location already exists');
      }
    }
    const countryRecord = countryValue
      ? await getRecordByTitle(Country, countryValue)
      : null;
    const [affectedRows, [updatedLocation]] = await Location.update(
      {
        title,
        countryId: countryRecord?.id || null,
        coatOfArms: coatOfArmsValue || null,
      },
      { where: { id }, returning: true, transaction }
    );
    if (!affectedRows) {
      throw badRequest('No data has been updated for this location');
    }
    return formatLocationData(updatedLocation);
  }

  static async deleteLocation(id, transaction) {
    const foundLocation = await Location.findByPk(id);
    if (!foundLocation) {
      throw notFound('Location not found');
    }
    const deletedLocation = await Location.destroy({
      where: { id },
      transaction,
    });
    if (!deletedLocation) {
      throw badRequest('No data has been deleted for this location');
    }
    return deletedLocation;
  }
}

module.exports = LocationsService;
