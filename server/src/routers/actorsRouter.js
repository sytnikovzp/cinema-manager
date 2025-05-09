const { Router } = require('express');

const {
  validation: { validatePerson, validatePatchPerson },
  pagination: { paginateElements },
} = require('../middlewares');

const {
  getAllActors,
  createActor,
  updateActor,
  getActorById,
  deleteActor,
  patchActor,
} = require('../controllers/actorsController');

const actorsRouter = new Router();

actorsRouter
  .route('/')
  .get(paginateElements, getAllActors)
  .post(validatePerson, createActor)
  .put(validatePerson, updateActor);

actorsRouter
  .route('/:actorId')
  .get(getActorById)
  .delete(deleteActor)
  .patch(validatePatchPerson, patchActor);

module.exports = actorsRouter;
