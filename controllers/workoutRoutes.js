const express = require('express');
const router = express.Router();
const { Workout } = require('../models');
const withAuth = require('../utils/auth');

// GET all workouts for the current user
router.get('/workouts', withAuth, async (req, res) => {
  try {
    const workouts = await Workout.findAll({
      where: { userId: req.session.user_id },
      order: [['date', 'DESC']],
    });

    const plainWorkouts = workouts.map((w) => w.get({ plain: true }));

    res.render('workouts', {
      workouts: plainWorkouts,
      logged_in: true,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).render('error', {
      message: 'Unable to load workouts.',
      backUrl: '/dashboard',
    });
  }
});

// POST: Create a new workout
router.post('/workouts', withAuth, async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      ...req.body,
      userId: req.session.user_id,
    });

    res.status(200).json(newWorkout);
  } catch (err) {
    res.status(400).json({ error: 'Workout creation failed.' });
  }
});

// GET: Single workout by ID (for editing)
router.get('/workouts/:id', withAuth, async (req, res) => {
  try {
    const workout = await Workout.findOne({
      where: {
        id: req.params.id,
        userId: req.session.user_id,
      },
    });

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving workout' });
  }
});

// PUT: Update a workout by ID
router.put('/workouts/:id', withAuth, async (req, res) => {
  try {
    const updated = await Workout.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.session.user_id,
      },
    });

    if (updated[0] === 0) {
      return res.status(404).json({ error: 'Workout not found or not updated' });
    }

    res.status(200).json({ message: 'Workout updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// DELETE: Delete a workout by ID
router.delete('/workouts/:id', withAuth, async (req, res) => {
  try {
    const deleted = await Workout.destroy({
      where: {
        id: req.params.id,
        userId: req.session.user_id,
      },
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

module.exports = router;
