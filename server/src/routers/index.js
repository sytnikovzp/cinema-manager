const { Router } = require('express');

const actorsRouter = require('./actorsRouter');
const countriesRouter = require('./countriesRouter');
const directorsRouter = require('./directorsRouter');
const genresRouter = require('./genresRouter');
const locationsRouter = require('./locationsRouter');
const moviesRouter = require('./moviesRouter');
const studiosRouter = require('./studiosRouter');

const router = new Router();

router.use('/genres', genresRouter);
router.use('/countries', countriesRouter);
router.use('/locations', locationsRouter);
router.use('/actors', actorsRouter);
router.use('/directors', directorsRouter);
router.use('/movies', moviesRouter);
router.use('/studios', studiosRouter);

module.exports = router;
