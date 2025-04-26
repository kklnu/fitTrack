const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Home Page
router.get('/', (req, res) => {
  res.render('home');
});

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Signup Page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Signup Logic
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.redirect('/dashboard');
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      const message = err.errors[0].message.includes('email')
        ? 'This email is already registered.'
        : 'That username is already taken.';

      return res.status(400).render('error', {
        message,
        backUrl: '/signup'
      });
    }

    res.status(500).render('error', {
      message: 'Something went wrong. Please try again.',
      backUrl: '/signup'
    });
  }
});

// Login Logic
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user || !user.checkPassword(req.body.password)) {
      return res.status(400).render('error', {
        message: 'Invalid email or password.',
        backUrl: '/login'
      });
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;

      res.redirect('/dashboard');
    });
  } catch (err) {
    res.status(500).render('error', {
      message: 'Something went wrong. Please try again.',
      backUrl: '/login'
    });
  }
});

// Logout
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => res.redirect('/login'));
  } else {
    res.redirect('/login');
  }
});

// ✅ Dev-only: View all users (for testing)
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email']
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
