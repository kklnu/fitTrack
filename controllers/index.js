const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const workoutRoutes = require('./workoutRoutes');
const goalRoutes = require('./goalRoutes');
const progressRoutes = require('./progressRoutes');

router.use('/', authRoutes);
router.use('/', dashboardRoutes);
router.use('/', workoutRoutes);
router.use('/', goalRoutes);
router.use('/', progressRoutes);
module.exports = router;
