const express = require('express');
const router = express.Router();
const { Message } = require('../models/dbWrapper');
const authMiddleware = require('../middleware/auth');

// List of funny gaming bot responses to simulate a live lobby
const BOT_NAMES = ['FragMaster', 'ShadowSniper', 'NoobDestroyer', 'LagLord', 'SpeedyGonzales', 'PentaKill', 'LootGoblin'];
const BOT_MESSAGES = [
  'Nice! Anyone else ready for the next cup?',
  'That tournament prize pool is looking juicy.',
  'Apex patch notes are insane. Horizon got buffed again?',
  'Who wants to form a team for the upcoming Valorant event?',
  'Check out the hoodie in the store, it looks sick.',
  'mechanical keyboard makes so much noise but feels so good lol',
  'I am currently rank 3 on the leaderboard, watch out @AimGod_V!',
  'Lag is killing me today, I swear my ping is over 9000.',
  'gg ez',
  'Add me for Elden Ring co-op!'
];

// @route   GET api/community/chat
// @desc    Get recent chat messages
// @access  Public
router.get('/chat', async (req, res) => {
  try {
    const chatMsgs = await Message.find({ type: 'chat' });
    // Keep only the last 50 messages
    const sliced = chatMsgs.slice(-50);
    res.json(sliced);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error loading chat messages' });
  }
});

// @route   POST api/community/chat
// @desc    Post a chat message
// @access  Private
router.post('/chat', authMiddleware, async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ message: 'Message content required' });
  }

  try {
    const newMsg = await Message.create({
      type: 'chat',
      username: req.user.username,
      message: message.trim()
    });

    // Simulate another gamer replying in the lobby in the background
    // (We will write it directly to the in-memory/DB store asynchronously)
    setTimeout(async () => {
      try {
        const botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
        const botMsg = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
        await Message.create({
          type: 'chat',
          username: botName,
          message: botMsg
        });
      } catch (err) {
        // silent fail
      }
    }, 2500);

    res.json(newMsg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error posting chat message' });
  }
});

// @route   GET api/community/forum
// @desc    Get all forum threads
// @access  Public
router.get('/forum', async (req, res) => {
  try {
    const threads = await Message.find({ type: 'forum' });
    res.json(threads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error loading forum threads' });
  }
});

// @route   POST api/community/forum
// @desc    Create a new forum thread
// @access  Private
router.post('/forum', authMiddleware, async (req, res) => {
  const { title, message } = req.body;

  if (!title || !message || title.trim() === '' || message.trim() === '') {
    return res.status(400).json({ message: 'Title and message content are required' });
  }

  try {
    const newThread = await Message.create({
      type: 'forum',
      title: title.trim(),
      username: req.user.username,
      message: message.trim()
    });
    res.json(newThread);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating forum thread' });
  }
});

// @route   POST api/community/forum/:id/reply
// @desc    Reply to a forum thread
// @access  Private
router.post('/forum/:id/reply', authMiddleware, async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ message: 'Reply content required' });
  }

  try {
    const thread = await Message.findById(req.params.id);
    if (!thread || thread.type !== 'forum') {
      return res.status(404).json({ message: 'Forum thread not found' });
    }

    const updatedThread = await Message.findByIdAndUpdate(req.params.id, {
      $push: {
        replies: {
          username: req.user.username,
          message: message.trim()
        }
      }
    });

    res.json({ message: 'Reply posted successfully', thread: updatedThread });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error posting reply' });
  }
});

module.exports = router;
