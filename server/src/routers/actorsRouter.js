const { Router } = require('express');

const {
  validation: { validatePerson },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllActors,
  getActorByUuid,
  createActor,
  updateActor,
  deleteActor,
} = require('../controllers/actorsController');

const actorsRouter = new Router();

actorsRouter
  .route('/')
  .get(paginateElements, getAllActors)
  .post(validatePerson, createActor);

actorsRouter
  .route('/:actorUuid')
  .get(getActorByUuid)
  .delete(deleteActor)
  .patch(validatePerson, updateActor);

module.exports = actorsRouter;
