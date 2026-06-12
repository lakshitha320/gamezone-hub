const express = require('express');
const router = express.Router();
const { Tournament, Order, User } = require('../models/dbWrapper');
const authMiddleware = require('../middleware/auth');

// @route   GET api/dashboard/summary
// @desc    Get dashboard registrations and order history for logged in user
// @access  Private
router.get('/summary', authMiddleware, async (req, res) => {
  try {
    const username = req.user.username;
    const userId = req.user.userId;

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch tournaments user is registered in
    const allTournaments = await Tournament.find();
    const registeredTournaments = allTournaments.filter(t => 
      t.registeredTeams && t.registeredTeams.includes(username)
    );

    // Fetch orders placed by this user
    const orders = await Order.find({ userId });

    res.json({
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      },
      tournaments: registeredTournaments,
      orders: orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error loading dashboard details' });
  }
});

module.exports = router;
