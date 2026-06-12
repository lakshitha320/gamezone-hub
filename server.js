require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./server/config/db');
const { Team, Leaderboard, News } = require('./server/models/dbWrapper');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/games', require('./server/routes/games'));
app.use('/api/tournaments', require('./server/routes/tournaments'));
app.use('/api/store', require('./server/routes/store'));
app.use('/api/community', require('./server/routes/community'));
app.use('/api/dashboard', require('./server/routes/dashboard'));
app.use('/api/admin', require('./server/routes/admin'));

// Direct global endpoints
// @route   GET api/teams
// @desc    Get all esports teams and players
// @access  Public
app.get('/api/teams', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error loading esports teams' });
  }
});

// @route   GET api/leaderboard
// @desc    Get global rankings
// @access  Public
app.get('/api/leaderboard', async (req, res) => {
  try {
    const rankings = await Leaderboard.find();
    res.json(rankings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error loading leaderboard rankings' });
  }
});

// @route   GET api/news
// @desc    Get all news articles
// @access  Public
app.get('/api/news', async (req, res) => {
  try {
    const articles = await News.find();
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error loading news articles' });
  }
});

// Fallback to index.html for Single Page Application or route matching in browser
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 GameZone Hub server running at http://localhost:${PORT}`);
  console.log(`📡 Serving static files from: ${path.join(__dirname, 'public')}`);
});
