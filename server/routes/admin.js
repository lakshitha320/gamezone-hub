const express = require('express');
const router = express.Router();
const { User, Game, Tournament, Order } = require('../models/dbWrapper');
const authMiddleware = require('../middleware/auth');

// Middleware to check if user is admin
const adminCheck = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Administrator privileges required' });
  }
};

// @route   GET api/admin/stats
// @desc    Get system analytics (Admin only)
// @access  Private Admin
router.get('/stats', authMiddleware, adminCheck, async (req, res) => {
  try {
    const users = await User.find();
    const games = await Game.find();
    const tournaments = await Tournament.find();
    const orders = await Order.find();

    const totalUsers = users.length;
    const totalGames = games.length;
    const totalTournaments = tournaments.length;
    const totalOrders = orders.length;

    // Calculate revenue
    const revenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const totalRevenue = Number(revenue.toFixed(2));

    // Compile a list of user accounts with sensitive password fields removed
    const userList = users.map(u => ({
      id: u._id,
      username: u.username,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt
    }));

    res.json({
      metrics: {
        totalUsers,
        totalGames,
        totalTournaments,
        totalOrders,
        totalRevenue
      },
      users: userList,
      games,
      tournaments
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error compiling admin statistics' });
  }
});

module.exports = router;
