const express = require('express');
const router = express.Router();
const { Goal } = require('../models');
const withAuth = require('../utils/auth');

// GET all goals
router.get('/goals', withAuth, async (req, res) => {
  try {
    const goals = await Goal.findAll({
      where: { userId: req.session.user_id },
      order: [['targetDate', 'ASC']],
    });

    const plainGoals = goals.map((g) => g.get({ plain: true }));

    res.render('goals', {
      goals: plainGoals,
      logged_in: true,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).render('error', {
      message: 'Unable to load goals.',
      backUrl: '/dashboard',
    });
  }
});
// POST: Create a new goal
router.post('/goals', withAuth, async (req, res) => {
    try {
      const newGoal = await Goal.create({
        description: req.body.description,
        targetDate: req.body.targetDate,
        isAchieved: false,
        userId: req.session.user_id
      });
  
      res.status(200).json(newGoal);
    } catch (err) {
      res.status(400).json({ error: 'Goal creation failed' });
    }
  });
  // GET a single goal by ID (for editing)
router.get('/goals/:id', withAuth, async (req, res) => {
    try {
      const goal = await Goal.findOne({
        where: {
          id: req.params.id,
          userId: req.session.user_id,
        },
      });
  
      if (!goal) return res.status(404).json({ error: 'Goal not found' });
  
      res.status(200).json(goal);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get goal' });
    }
  });
  
  // PUT update goal
  router.put('/goals/:id', withAuth, async (req, res) => {
    try {
      const updated = await Goal.update(
        {
          description: req.body.description,
          targetDate: req.body.targetDate,
        },
        {
          where: {
            id: req.params.id,
            userId: req.session.user_id,
          },
        }
      );
  
      if (updated[0] === 0) return res.status(404).json({ error: 'Goal not updated' });
  
      res.status(200).json({ message: 'Goal updated' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update goal' });
    }
  });
  
  // PUT mark goal as complete
  router.put('/goals/complete/:id', withAuth, async (req, res) => {
    try {
      const updated = await Goal.update(
        { isAchieved: true },
        {
          where: {
            id: req.params.id,
            userId: req.session.user_id,
          },
        }
      );
  
      if (updated[0] === 0) return res.status(404).json({ error: 'Goal not found' });
  
      res.status(200).json({ message: 'Goal marked complete' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to mark goal complete' });
    }
  });
  
  // DELETE a goal
  router.delete('/goals/:id', withAuth, async (req, res) => {
    try {
      const deleted = await Goal.destroy({
        where: {
          id: req.params.id,
          userId: req.session.user_id,
        },
      });
  
      if (!deleted) return res.status(404).json({ error: 'Goal not found' });
  
      res.status(200).json({ message: 'Goal deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete goal' });
    }
  });
  
module.exports = router;
