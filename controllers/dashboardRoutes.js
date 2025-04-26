const express = require('express');
const router = express.Router();
const { Workout, Goal, ProgressLog } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');

// Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const workoutsThisWeek = await Workout.count({
      where: {
        userId,
        date: {
          [Op.gte]: startOfWeek,
        },
      },
    });

    const goalsRemaining = await Goal.count({
      where: {
        userId,
        isAchieved: false,
      },
    });

    const lastLog = await ProgressLog.findOne({
      where: { userId },
      order: [['date', 'DESC']],
    });

    const lastWeight = lastLog ? `${lastLog.weight} kg` : 'N/A';

    res.render('dashboard', {
      logged_in: true,
      username: req.session.username,
      workoutsThisWeek,
      goalsRemaining,
      lastWeight,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Error loading dashboard.', backUrl: '/' });
  }
});

module.exports = router;
