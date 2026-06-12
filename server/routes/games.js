const express = require('express');
const router = express.Router();
const { Game } = require('../models/dbWrapper');
const authMiddleware = require('../middleware/auth');

// Helper to check if user is admin
const adminCheck = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Administrator privileges required' });
  }
};

// @route   GET api/games
// @desc    Get all games (with search and category filters)
// @access  Public
router.get('/', async (req, res) => {
  const { search, category } = req.query;
  const query = {};

  if (category && category !== 'All') {
    query.category = category;
  }

  if (search) {
    query.title = { $regex: search };
  }

  try {
    const games = await Game.find(query);
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching games' });
  }
});

// @route   POST api/games
// @desc    Add a new game (Admin only)
// @access  Private Admin
router.post('/', authMiddleware, adminCheck, async (req, res) => {
  const { title, category, description, rating, image, platform, price, releaseDate } = req.body;

  if (!title || !category || !description || !image) {
    return res.status(400).json({ message: 'Please provide title, category, description, and image' });
  }

  try {
    const newGame = await Game.create({
      title,
      category,
      description,
      rating: Number(rating) || 0,
      image,
      platform: platform || 'PC',
      price: Number(price) || 0,
      releaseDate: releaseDate || new Date().toISOString().split('T')[0]
    });
    res.json(newGame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating game' });
  }
});

// @route   PUT api/games/:id
// @desc    Update a game (Admin only)
// @access  Private Admin
router.put('/:id', authMiddleware, adminCheck, async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(updatedGame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating game' });
  }
});

// @route   DELETE api/games/:id
// @desc    Delete a game (Admin only)
// @access  Private Admin
router.delete('/:id', authMiddleware, adminCheck, async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json({ message: 'Game deleted successfully', game: deletedGame });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting game' });
  }
});

// @route   POST api/games/:id/rate
// @desc    Rate a game
// @access  Private
router.post('/:id/rate', authMiddleware, async (req, res) => {
  const { rating } = req.body;
  const numRating = Number(rating);

  if (!numRating || numRating < 1 || numRating > 5) {
    return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
  }

  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // In a fully-fledged app, we would store individual reviews/ratings and compute average.
    // For simplicity, we adjust the average: (old rating + new rating) / 2
    const currentRating = game.rating || 0;
    const newAverage = currentRating === 0 ? numRating : Number(((currentRating + numRating) / 2).toFixed(1));

    const updatedGame = await Game.findByIdAndUpdate(req.params.id, { rating: newAverage });
    res.json({ message: 'Rating updated', rating: newAverage, game: updatedGame });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error rating game' });
  }
});

module.exports = router;
