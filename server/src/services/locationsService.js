const { Location, Country } = require('../db/models');

const { notFound, badRequest } = require('../errors/generalErrors');
const {
  formatDateTime,
  getRecordByTitle,
} = require('../utils/sharedFunctions');
const { isValidUUID } = require('../utils/validators');

const formatLocationData = (location) => ({
  uuid: location.uuid,
  title: location.title,
  coatOfArms: location.coatOfArms || '',
  createdAt: formatDateTime(location.createdAt),
  updatedAt: formatDateTime(location.updatedAt),
});

class LocationsService {
  static async getAllLocations(limit, offset) {
    const foundLocations = await Location.findAll({
      attributes: ['uuid', 'title', 'coatOfArms'],
      include: [{ model: Country, attributes: ['title'] }],
      raw: true,
      limit,
      offset,
      order: [['uuid', 'DESC']],
    });
    if (!foundLocations.length) {
      throw notFound('Locations not found');
    }
    const allLocations = foundLocations.map(
      ({ uuid, title, coatOfArms, 'Country.title': countryTitle }) => ({
        uuid,
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

  static async getLocationByUuid(uuid) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundLocation = await Location.findByPk(uuid, {
      attributes: { exclude: ['countryUuid'] },
      include: [{ model: Country, attributes: ['uuid', 'title'] }],
    });
    if (!foundLocation) {
      throw notFound('Location not found');
    }
    const locationData = {
      ...foundLocation.toJSON(),
      countryUuid: foundLocation.Country?.uuid || '',
      countryTitle: foundLocation.Country?.title || '',
    };
    return {
      ...formatLocationData(locationData),
      country: {
        uuid: locationData.countryUuid,
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
        countryUuid: countryRecord?.uuid || null,
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
    uuid,
    title,
    countryValue,
    coatOfArmsValue,
    transaction
  ) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundLocation = await Location.findByPk(uuid);
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
        countryUuid: countryRecord?.uuid || null,
        coatOfArms: coatOfArmsValue || null,
      },
      { where: { uuid }, returning: true, transaction }
    );
    if (!affectedRows) {
      throw badRequest('No data has been updated for this location');
    }
    return formatLocationData(updatedLocation);
  }

  static async deleteLocation(uuid, transaction) {
    if (!isValidUUID(uuid)) {
      throw badRequest('Invalid UUID format');
    }
    const foundLocation = await Location.findByPk(uuid);
    if (!foundLocation) {
      throw notFound('Location not found');
    }
    const deletedLocation = await Location.destroy({
      where: { uuid },
      transaction,
    });
    if (!deletedLocation) {
      throw badRequest('No data has been deleted for this location');
    }
    return deletedLocation;
  }
}

module.exports = LocationsService;
