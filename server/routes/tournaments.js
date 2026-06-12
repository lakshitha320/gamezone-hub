const express = require('express');
const router = express.Router();
const { Tournament, User } = require('../models/dbWrapper');
const authMiddleware = require('../middleware/auth');

const adminCheck = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Administrator privileges required' });
  }
};

// @route   GET api/tournaments
// @desc    Get all tournaments
// @access  Public
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching tournaments' });
  }
});

// @route   POST api/tournaments/:id/register
// @desc    Register a user/team for a tournament
// @access  Private
router.post('/:id/register', authMiddleware, async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    if (tournament.status === 'completed') {
      return res.status(400).json({ message: 'Tournament has already finished' });
    }

    // Check if user is already registered
    const username = req.user.username;
    if (tournament.registeredTeams.includes(username)) {
      return res.status(400).json({ message: 'You are already registered for this tournament' });
    }

    // Check if slots are full
    if (tournament.registeredTeams.length >= tournament.slots) {
      return res.status(400).json({ message: 'Tournament is full' });
    }

    // Add user's name/team to tournament
    await Tournament.findByIdAndUpdate(req.params.id, {
      $push: { registeredTeams: username }
    });

    // Add tournament to user's registered list
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { registeredTournaments: req.params.id }
    });

    res.json({ message: 'Successfully registered for the tournament', tournamentId: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error registering for tournament' });
  }
});

// @route   POST api/tournaments
// @desc    Create a new tournament (Admin only)
// @access  Private Admin
router.post('/', authMiddleware, adminCheck, async (req, res) => {
  const { title, game, date, time, prizePool, slots } = req.body;

  if (!title || !game || !date || !time || !prizePool || !slots) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const newTournament = await Tournament.create({
      title,
      game,
      date,
      time,
      prizePool,
      slots: Number(slots),
      status: 'upcoming'
    });
    res.json(newTournament);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating tournament' });
  }
});

// @route   PUT api/tournaments/:id
// @desc    Update a tournament (Admin only)
// @access  Private Admin
router.put('/:id', authMiddleware, adminCheck, async (req, res) => {
  try {
    const updatedTournament = await Tournament.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedTournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.json(updatedTournament);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating tournament' });
  }
});

// @route   DELETE api/tournaments/:id
// @desc    Delete a tournament (Admin only)
// @access  Private Admin
router.delete('/:id', authMiddleware, adminCheck, async (req, res) => {
  try {
    const deletedTournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!deletedTournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.json({ message: 'Tournament deleted successfully', tournament: deletedTournament });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting tournament' });
  }
});

module.exports = router;
