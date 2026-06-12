const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ==========================================
// 1. MONGOOSE SCHEMA & MODEL DEFINITIONS
// ==========================================

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // 'user' or 'admin'
  registeredTournaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }],
  createdAt: { type: Date, default: Date.now }
});

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0 },
  image: { type: String, required: true },
  platform: { type: String, default: 'PC' },
  price: { type: Number, default: 0 },
  releaseDate: { type: String }
});

const tournamentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  game: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  prizePool: { type: String, required: true },
  slots: { type: Number, required: true },
  registeredTeams: [{ type: String }],
  status: { type: String, default: 'upcoming' } // 'upcoming', 'active', 'completed'
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  players: [{
    name: { type: String },
    role: { type: String }
  }],
  stats: {
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 }
  },
  achievements: [{ type: String }]
});

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  items: [{
    productId: { type: String },
    title: { type: String },
    price: { type: Number },
    quantity: { type: Number }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'completed' },
  createdAt: { type: Date, default: Date.now }
});

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  image: { type: String },
  date: { type: String },
  category: { type: String, default: 'General' }
});

const messageSchema = new mongoose.Schema({
  type: { type: String, default: 'chat' }, // 'chat' or 'forum'
  title: { type: String }, // For forum posts
  username: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  replies: [{
    username: { type: String },
    message: { type: String },
    timestamp: { type: Date, default: Date.now }
  }]
});

const leaderboardSchema = new mongoose.Schema({
  rank: { type: Number },
  username: { type: String },
  points: { type: Number },
  winRate: { type: String },
  gamesPlayed: { type: Number }
});

// Compile models conditionally (only if mongoose is used, to avoid errors if not connected)
let MongoUser, MongoGame, MongoTournament, MongoTeam, MongoOrder, MongoNews, MongoMessage, MongoLeaderboard;
try {
  MongoUser = mongoose.model('User', userSchema);
  MongoGame = mongoose.model('Game', gameSchema);
  MongoTournament = mongoose.model('Tournament', tournamentSchema);
  MongoTeam = mongoose.model('Team', teamSchema);
  MongoOrder = mongoose.model('Order', orderSchema);
  MongoNews = mongoose.model('News', newsSchema);
  MongoMessage = mongoose.model('Message', messageSchema);
  MongoLeaderboard = mongoose.model('Leaderboard', leaderboardSchema);
} catch (e) {
  // Models might be already compiled
}

// ==========================================
// 2. IN-MEMORY DATA STORE (SEED DATA)
// ==========================================

const salt = bcrypt.genSaltSync(10);
const hashedAdminPassword = bcrypt.hashSync('admin123', salt);
const hashedUserPassword = bcrypt.hashSync('user123', salt);

const inMemoryDb = {
  users: [
    {
      _id: 'user_1',
      username: 'admin',
      email: 'admin@gamezone.com',
      password: hashedAdminPassword,
      role: 'admin',
      registeredTournaments: [],
      createdAt: new Date('2026-01-01')
    },
    {
      _id: 'user_2',
      username: 'gamer1',
      email: 'gamer1@gamezone.com',
      password: hashedUserPassword,
      role: 'user',
      registeredTournaments: ['tour_1'],
      createdAt: new Date('2026-02-15')
    }
  ],
  games: [
    {
      _id: 'game_1',
      title: 'Apex Legends',
      category: 'Battle Royale',
      description: 'Choose your legend and conquer the battlefield in this fast-paced hero shooter. Experience squad-based tactical combat and unique character abilities.',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600',
      platform: 'PC / Console',
      price: 0,
      releaseDate: '2019-02-04'
    },
    {
      _id: 'game_2',
      title: 'Cyberpunk 2077',
      category: 'RPG',
      description: 'An open-world action-adventure RPG set in Night City, a megalopolis obsessed with power, glamour, and body modification. Play as V, a mercenary outlaw.',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600',
      platform: 'PC / PS5 / Xbox Series X',
      price: 59.99,
      releaseDate: '2020-12-10'
    },
    {
      _id: 'game_3',
      title: 'Valorant',
      category: 'FPS',
      description: 'A 5v5 character-based tactical shooter where precise gunplay meets unique agent abilities. Plant or defuse the Spike in high-stakes rounds.',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600',
      platform: 'PC',
      price: 0,
      releaseDate: '2020-06-02'
    },
    {
      _id: 'game_4',
      title: 'Elden Ring',
      category: 'Action RPG',
      description: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1655821888788-6107699e173b?q=80&w=600',
      platform: 'PC / Console',
      price: 49.99,
      releaseDate: '2022-02-25'
    },
    {
      _id: 'game_5',
      title: 'Grand Theft Auto V',
      category: 'Action',
      description: 'When a young street hustler, a retired bank robber, and a terrifying psychopath find themselves entangled with some of the most frightening elements of the underworld, they must pull off a series of dangerous heists.',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600',
      platform: 'PC / Console',
      price: 29.99,
      releaseDate: '2013-09-17'
    },
    {
      _id: 'game_6',
      title: 'Hades II',
      category: 'Rogue-like',
      description: 'Battle beyond the Underworld using dark sorcery to confront the Titan of Time in this bewitching action rogue-like sequel.',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600',
      platform: 'PC',
      price: 29.99,
      releaseDate: '2024-05-06'
    }
  ],
  tournaments: [
    {
      _id: 'tour_1',
      title: 'Valorant Champions Cup',
      game: 'Valorant',
      date: '2026-06-25',
      time: '18:00 UTC',
      prizePool: '$5,000',
      slots: 16,
      registeredTeams: ['Sentinels', 'Fnatic', 'Paper Rex', 'gamer1'],
      status: 'upcoming'
    },
    {
      _id: 'tour_2',
      title: 'Apex Legends Showdown',
      game: 'Apex Legends',
      date: '2026-07-02',
      time: '19:00 UTC',
      prizePool: '$3,000',
      slots: 20,
      registeredTeams: ['TSM', 'Alliance', 'DarkZero'],
      status: 'upcoming'
    },
    {
      _id: 'tour_3',
      title: 'Elden Speedrun Tournament',
      game: 'Elden Ring',
      date: '2026-06-10',
      time: '15:00 UTC',
      prizePool: '$1,500',
      slots: 8,
      registeredTeams: ['Distortion2', 'LilAggy', 'Seeker', 'GinoMachino'],
      status: 'completed'
    }
  ],
  teams: [
    {
      _id: 'team_1',
      name: 'Neon Reapers',
      logo: '💀',
      players: [
        { name: 'ShroudX', role: 'Duelist / IGL' },
        { name: 'TenZy', role: 'Initiator' },
        { name: 'Valkyria', role: 'Sentinel' },
        { name: 'WraithGuy', role: 'Controller' },
        { name: 'Flexy', role: 'Flex' }
      ],
      stats: { wins: 45, losses: 12 },
      achievements: ['Championship 2025 Winner', 'Vegas Open Finalist', 'CyberCup 2024 Champion']
    },
    {
      _id: 'team_2',
      name: 'Cyber Phantoms',
      logo: '👻',
      players: [
        { name: 'Aces', role: 'IGL / Controller' },
        { name: 'Zephyr', role: 'Duelist' },
        { name: 'Nix', role: 'Initiator' },
        { name: 'Specter', role: 'Sentinel' },
        { name: 'Shadow', role: 'Flex' }
      ],
      stats: { wins: 38, losses: 19 },
      achievements: ['Winter Invitational 2025 Runner-up', 'Intel LAN 2024 Top 4']
    },
    {
      _id: 'team_3',
      name: 'Apex Predators',
      logo: '🦁',
      players: [
        { name: 'ImperialH', role: 'IGL' },
        { name: 'Hal9000', role: 'Fragger' },
        { name: 'VerhulstX', role: 'Anchor' }
      ],
      stats: { wins: 52, losses: 8 },
      achievements: ['Apex Global Champion 2025', 'Split 1 Playoff Winner']
    }
  ],
  orders: [
    {
      _id: 'order_1',
      userId: 'user_2',
      username: 'gamer1',
      items: [
        { productId: 'item_2', title: 'RGB Gaming Mouse', price: 79.99, quantity: 1 }
      ],
      totalAmount: 79.99,
      status: 'completed',
      createdAt: new Date('2026-06-01')
    }
  ],
  news: [
    {
      _id: 'news_1',
      title: 'Cyberpunk Expansion Announced',
      summary: 'Developers reveal a massive new expansion set to release late this year.',
      content: 'The new expansion will take players to a brand new sector of Night City, introducing new characters, weapons, and a branching cyber-thriller storyline. Explore high-tech black markets and engage in corporate espionage in the deepest slums. Check out the trailer on our home page now!',
      author: 'CyberEditor',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600',
      date: '2026-06-11',
      category: 'Updates'
    },
    {
      _id: 'news_2',
      title: 'Valorant Patch Notes 10.05',
      summary: 'New agent balances, map updates, and UI enhancements detailed here.',
      content: 'Agent changes are coming in hot this patch, with tweaks to Flash capabilities and Sentinel setups. Additionally, the map Breeze is getting critical sightline reworks. The competitive queue will be offline for 2 hours during deployment, but expect a much smoother gameplay loop when you log back in!',
      author: 'TacticalReporter',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600',
      date: '2026-06-09',
      category: 'Patches'
    },
    {
      _id: 'news_3',
      title: 'Esports League Season 4 Kicks Off',
      summary: 'Top 16 global teams prepare to clash for the ultimate title.',
      content: 'The highly anticipated Season 4 tournament series starts this Friday. With a record prize pool of $100,000, teams have been bootcamping for weeks. Read about the opening matchups, rosters, and watch live streams directly from our tournaments tab.',
      author: 'EsportsHost',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600',
      date: '2026-06-05',
      category: 'Esports'
    }
  ],
  messages: [
    {
      _id: 'msg_1',
      type: 'chat',
      username: 'System',
      message: 'Welcome to the GameZone Chatroom! Play, compete, connect.',
      timestamp: new Date()
    },
    {
      _id: 'msg_2',
      type: 'chat',
      username: 'gamer1',
      message: 'Hey anyone up for a Valorant game tonight?',
      timestamp: new Date(Date.now() - 600000)
    },
    {
      _id: 'msg_3',
      type: 'chat',
      username: 'AimGod_V',
      message: 'Sure, add me AimGod_V#NA1. Let\'s queue up!',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      _id: 'forum_1',
      type: 'forum',
      title: 'Best gaming mouse for FPS in 2026?',
      username: 'gamer1',
      message: 'Looking to upgrade my mouse. I primarily play FPS games like Valorant and Apex. Should I go superlight wireless or are wired mice still better for latency? Budget is around $150.',
      timestamp: new Date('2026-06-11T12:00:00Z'),
      replies: [
        {
          username: 'AimGod_V',
          message: 'Honestly, wireless tech is so good now, there is zero noticeable latency difference. The Superlight 2 or Razer Viper V3 Pro are current tier 1 mice.',
          timestamp: new Date('2026-06-11T12:30:00Z')
        },
        {
          username: 'CyberSamurai',
          message: 'Viper V3 Pro for sure. The shape is amazing if you have medium-large hands. Best sensor on the market right now.',
          timestamp: new Date('2026-06-11T14:15:00Z')
        }
      ]
    },
    {
      _id: 'forum_2',
      type: 'forum',
      title: 'Apex Legends Season 23 Meta Discussion',
      username: 'AimGod_V',
      message: 'What do you guys think of the latest legend updates? The balance patches changed a lot of team comps for the tournament.',
      timestamp: new Date('2026-06-10T10:00:00Z'),
      replies: [
        {
          username: 'System',
          message: 'Please keep all discussions respectful and on-topic!',
          timestamp: new Date('2026-06-10T10:05:00Z')
        }
      ]
    }
  ],
  leaderboard: [
    { rank: 1, username: 'AimGod_V', points: 2850, winRate: '78%', gamesPlayed: 120 },
    { rank: 2, username: 'CyberSamurai', points: 2640, winRate: '72%', gamesPlayed: 145 },
    { rank: 3, username: 'NinjaLoot', points: 2510, winRate: '69%', gamesPlayed: 110 },
    { rank: 4, username: 'PixelRebel', points: 2380, winRate: '65%', gamesPlayed: 98 },
    { rank: 5, username: 'ShadowWalker', points: 2210, winRate: '63%', gamesPlayed: 130 },
    { rank: 6, username: 'gamer1', points: 2050, winRate: '60%', gamesPlayed: 85 }
  ]
};

// ==========================================
// 3. DATABASE HELPER WRAPPERS
// ==========================================

const User = {
  find: async (query = {}) => {
    if (global.useMongo) return await MongoUser.find(query);
    return inMemoryDb.users.filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  },
  findOne: async (query = {}) => {
    if (global.useMongo) return await MongoUser.findOne(query);
    return inMemoryDb.users.find(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    }) || null;
  },
  findById: async (id) => {
    if (global.useMongo) return await MongoUser.findById(id);
    return inMemoryDb.users.find(item => item._id === id) || null;
  },
  create: async (data) => {
    if (global.useMongo) return await MongoUser.create(data);
    const newDoc = {
      _id: 'user_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      registeredTournaments: [],
      ...data
    };
    inMemoryDb.users.push(newDoc);
    return newDoc;
  },
  findByIdAndUpdate: async (id, update, options = {}) => {
    if (global.useMongo) return await MongoUser.findByIdAndUpdate(id, update, { new: true, ...options });
    const idx = inMemoryDb.users.findIndex(item => item._id === id);
    if (idx === -1) return null;
    const item = inMemoryDb.users[idx];

    // Handle Mongoose push
    if (update.$push) {
      for (const k in update.$push) {
        if (!item[k]) item[k] = [];
        item[k].push(update.$push[k]);
      }
    }
    // Handle standard update fields
    for (const k in update) {
      if (k !== '$push') {
        item[k] = update[k];
      }
    }
    return item;
  }
};

const Game = {
  find: async (query = {}) => {
    if (global.useMongo) return await MongoGame.find(query);
    return inMemoryDb.games.filter(item => {
      return Object.keys(query).every(key => {
        if (typeof query[key] === 'object' && query[key] !== null) {
          // simple regex mock support for search
          if (query[key].$regex) {
            const regex = new RegExp(query[key].$regex, 'i');
            return regex.test(item[key]);
          }
        }
        return item[key] === query[key];
      });
    });
  },
  findById: async (id) => {
    if (global.useMongo) return await MongoGame.findById(id);
    return inMemoryDb.games.find(item => item._id === id) || null;
  },
  create: async (data) => {
    if (global.useMongo) return await MongoGame.create(data);
    const newDoc = {
      _id: 'game_' + Math.random().toString(36).substr(2, 9),
      ...data
    };
    inMemoryDb.games.push(newDoc);
    return newDoc;
  },
  findByIdAndUpdate: async (id, update) => {
    if (global.useMongo) return await MongoGame.findByIdAndUpdate(id, update, { new: true });
    const idx = inMemoryDb.games.findIndex(item => item._id === id);
    if (idx === -1) return null;
    const item = { ...inMemoryDb.games[idx], ...update };
    inMemoryDb.games[idx] = item;
    return item;
  },
  findByIdAndDelete: async (id) => {
    if (global.useMongo) return await MongoGame.findByIdAndDelete(id);
    const idx = inMemoryDb.games.findIndex(item => item._id === id);
    if (idx === -1) return null;
    const deleted = inMemoryDb.games[idx];
    inMemoryDb.games.splice(idx, 1);
    return deleted;
  }
};

const Tournament = {
  find: async (query = {}) => {
    if (global.useMongo) return await MongoTournament.find(query);
    return inMemoryDb.tournaments.filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  },
  findById: async (id) => {
    if (global.useMongo) return await MongoTournament.findById(id);
    return inMemoryDb.tournaments.find(item => item._id === id) || null;
  },
  create: async (data) => {
    if (global.useMongo) return await MongoTournament.create(data);
    const newDoc = {
      _id: 'tour_' + Math.random().toString(36).substr(2, 9),
      registeredTeams: [],
      status: 'upcoming',
      ...data
    };
    inMemoryDb.tournaments.push(newDoc);
    return newDoc;
  },
  findByIdAndUpdate: async (id, update) => {
    if (global.useMongo) return await MongoTournament.findByIdAndUpdate(id, update, { new: true });
    const idx = inMemoryDb.tournaments.findIndex(item => item._id === id);
    if (idx === -1) return null;
    const item = inMemoryDb.tournaments[idx];

    if (update.$push) {
      for (const k in update.$push) {
        if (!item[k]) item[k] = [];
        item[k].push(update.$push[k]);
      }
    }
    for (const k in update) {
      if (k !== '$push') {
        item[k] = update[k];
      }
    }
    return item;
  },
  findByIdAndDelete: async (id) => {
    if (global.useMongo) return await MongoTournament.findByIdAndDelete(id);
    const idx = inMemoryDb.tournaments.findIndex(item => item._id === id);
    if (idx === -1) return null;
    const deleted = inMemoryDb.tournaments[idx];
    inMemoryDb.tournaments.splice(idx, 1);
    return deleted;
  }
};

const Team = {
  find: async (query = {}) => {
    if (global.useMongo) return await MongoTeam.find(query);
    return inMemoryDb.teams.filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }
};

const Order = {
  find: async (query = {}) => {
    if (global.useMongo) return await MongoOrder.find(query);
    return inMemoryDb.orders.filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  },
  create: async (data) => {
    if (global.useMongo) return await MongoOrder.create(data);
    const newDoc = {
      _id: 'order_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      status: 'completed',
      ...data
    };
    inMemoryDb.orders.push(newDoc);
    return newDoc;
  }
};

const News = {
  find: async (query = {}) => {
    if (global.useMongo) return await MongoNews.find(query);
    return inMemoryDb.news.filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  },
  findById: async (id) => {
    if (global.useMongo) return await MongoNews.findById(id);
    return inMemoryDb.news.find(item => item._id === id) || null;
  }
};

const Message = {
  find: async (query = {}) => {
    if (global.useMongo) return await MongoMessage.find(query);
    return inMemoryDb.messages.filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    }).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  },
  findById: async (id) => {
    if (global.useMongo) return await MongoMessage.findById(id);
    return inMemoryDb.messages.find(item => item._id === id) || null;
  },
  create: async (data) => {
    if (global.useMongo) return await MongoMessage.create(data);
    const newDoc = {
      _id: 'msg_' + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      replies: [],
      ...data
    };
    inMemoryDb.messages.push(newDoc);
    return newDoc;
  },
  findByIdAndUpdate: async (id, update) => {
    if (global.useMongo) return await MongoMessage.findByIdAndUpdate(id, update, { new: true });
    const idx = inMemoryDb.messages.findIndex(item => item._id === id);
    if (idx === -1) return null;
    const item = inMemoryDb.messages[idx];

    if (update.$push) {
      for (const k in update.$push) {
        if (!item[k]) item[k] = [];
        item[k].push({
          timestamp: new Date(),
          ...update.$push[k]
        });
      }
    }
    for (const k in update) {
      if (k !== '$push') {
        item[k] = update[k];
      }
    }
    return item;
  }
};

const Leaderboard = {
  find: async (query = {}) => {
    if (global.useMongo) return await MongoLeaderboard.find(query);
    return inMemoryDb.leaderboard.filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    }).sort((a, b) => a.rank - b.rank);
  }
};

module.exports = {
  User,
  Game,
  Tournament,
  Team,
  Order,
  News,
  Message,
  Leaderboard,
  inMemoryDb // Expose inMemoryDb for admin seeding or debugging if needed
};
