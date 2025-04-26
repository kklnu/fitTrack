const express = require('express');
const router = express.Router();
const { ProgressLog } = require('../models');
const withAuth = require('../utils/auth');

// GET all logs
router.get('/progress', withAuth, async (req, res) => {
  try {
    const logs = await ProgressLog.findAll({
      where: { userId: req.session.user_id },
      order: [['date', 'DESC']],
    });

    const plainLogs = logs.map((l) => l.get({ plain: true }));

    res.render('progress', {
      progressLogs: plainLogs,
      logged_in: true,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).render('error', { message: 'Error loading progress', backUrl: '/dashboard' });
  }
});

// GET one
router.get('/progress/:id', withAuth, async (req, res) => {
  const log = await ProgressLog.findOne({ where: { id: req.params.id, userId: req.session.user_id } });
  if (!log) return res.status(404).json({ error: 'Not found' });
  res.json(log);
});

// POST create
router.post('/progress', withAuth, async (req, res) => {
  try {
    const log = await ProgressLog.create({ ...req.body, userId: req.session.user_id });
    res.status(200).json(log);
  } catch {
    res.status(400).json({ error: 'Create failed' });
  }
});

// PUT update
router.put('/progress/:id', withAuth, async (req, res) => {
  const updated = await ProgressLog.update(req.body, {
    where: { id: req.params.id, userId: req.session.user_id },
  });
  if (updated[0] === 0) return res.status(404).json({ error: 'Not updated' });
  res.json({ message: 'Updated' });
});

// DELETE
router.delete('/progress/:id', withAuth, async (req, res) => {
  const deleted = await ProgressLog.destroy({ where: { id: req.params.id, userId: req.session.user_id } });
  if (!deleted) return res.status(404).json({ error: 'Not deleted' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
