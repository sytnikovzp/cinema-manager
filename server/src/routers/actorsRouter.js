const { Router } = require('express');

const {
  validation: { validatePerson },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllActors,
  getActorById,
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
  .route('/:actorId')
  .get(getActorById)
  .delete(deleteActor)
  .patch(validatePerson, updateActor);

module.exports = actorsRouter;
