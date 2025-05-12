const { sequelize } = require('../db/models');

const {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../services/locationsService');

class Locations {
  static async getAllLocations(req, res, next) {
    try {
      const {
        pagination: { limit, offset },
      } = req;
      const { allLocations, totalCount } = await getAllLocations(limit, offset);
      if (allLocations.length > 0) {
        res.status(200).set('X-Total-Count', totalCount).json(allLocations);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get all locations error: ', error.message);
      next(error);
    }
  }

  static async getLocationById(req, res, next) {
    try {
      const {
        params: { locationId },
      } = req;
      const locationById = await getLocationById(locationId);
      if (locationById) {
        res.status(200).json(locationById);
      } else {
        res.status(401);
      }
    } catch (error) {
      console.error('Get location by ID error: ', error.message);
      next(error);
    }
  }

  static async createLocation(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { title, country, coatOfArms },
      } = req;
      const newLocation = await createLocation(
        title,
        country,
        coatOfArms,
        transaction
      );
      if (newLocation) {
        await transaction.commit();
        res.status(201).json(newLocation);
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Create location error: ', error.message);
      next(error);
    }
  }

  static async updateLocation(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { locationId },
        body: { title, country, coatOfArms },
      } = req;
      const updatedLocation = await updateLocation(
        locationId,
        title,
        country,
        coatOfArms,
        transaction
      );
      if (updatedLocation) {
        await transaction.commit();
        res.status(200).json(updatedLocation);
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Update location error: ', error.message);
      next(error);
    }
  }

  static async deleteLocation(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { locationId },
      } = req;
      const deletedLocation = await deleteLocation(locationId, transaction);
      if (deletedLocation) {
        await transaction.commit();
        res.status(200).json('OK');
      } else {
        await transaction.rollback();
        res.status(401);
      }
    } catch (error) {
      await transaction.rollback();
      console.error('Delete location error: ', error.message);
      next(error);
    }
  }
}

module.exports = Locations;
