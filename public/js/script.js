// ==========================================
// GAMEZONE HUB MAIN COMMON FRONTEND SCRIPT
// ==========================================

const API_BASE = window.location.origin;

// Initialize mock data store for local browser fallback (when double-clicked or backend is offline)
const LOCAL_MOCKS = {
  games: [
    { _id: 'game_1', title: 'Apex Legends', category: 'Battle Royale', description: 'Choose your legend and conquer the battlefield in this fast-paced hero shooter. Experience squad-based tactical combat and unique character abilities.', rating: 4.8, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600', platform: 'PC / Console', price: 0, releaseDate: '2019-02-04' },
    { _id: 'game_2', title: 'Cyberpunk 2077', category: 'RPG', description: 'An open-world action-adventure RPG set in Night City, a megalopolis obsessed with power, glamour, and body modification. Play as V, a mercenary outlaw.', rating: 4.5, image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600', platform: 'PC / PS5 / Xbox Series X', price: 59.99, releaseDate: '2020-12-10' },
    { _id: 'game_3', title: 'Valorant', category: 'FPS', description: 'A 5v5 character-based tactical shooter where precise gunplay meets unique agent abilities. Plant or defuse the Spike in high-stakes rounds.', rating: 4.7, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600', platform: 'PC', price: 0, releaseDate: '2020-06-02' },
    { _id: 'game_4', title: 'Elden Ring', category: 'Action RPG', description: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.', rating: 4.9, image: 'https://images.unsplash.com/photo-1655821888788-6107699e173b?q=80&w=600', platform: 'PC / Console', price: 49.99, releaseDate: '2022-02-25' },
    { _id: 'game_5', title: 'Grand Theft Auto V', category: 'Action', description: 'When a street hustler, a retired bank robber, and a terrifying psychopath find themselves entangled with the underworld, they must pull off heists.', rating: 4.7, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600', platform: 'PC / Console', price: 29.99, releaseDate: '2013-09-17' },
    { _id: 'game_6', title: 'Hades II', category: 'Rogue-like', description: 'Battle beyond the Underworld using dark sorcery to confront the Titan of Time in this action rogue-like sequel.', rating: 4.8, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600', platform: 'PC', price: 29.99, releaseDate: '2024-05-06' }
  ],
  tournaments: [
    { _id: 'tour_1', title: 'Valorant Champions Cup', game: 'Valorant', date: '2026-06-25', time: '18:00 UTC', prizePool: '$5,000', slots: 16, registeredTeams: ['Sentinels', 'Fnatic', 'Paper Rex', 'gamer1'], status: 'upcoming' },
    { _id: 'tour_2', title: 'Apex Legends Showdown', game: 'Apex Legends', date: '2026-07-02', time: '19:00 UTC', prizePool: '$3,000', slots: 20, registeredTeams: ['TSM', 'Alliance', 'DarkZero'], status: 'upcoming' },
    { _id: 'tour_3', title: 'Elden Speedrun Tournament', game: 'Elden Ring', date: '2026-06-10', time: '15:00 UTC', prizePool: '$1,500', slots: 8, registeredTeams: ['Distortion2', 'LilAggy', 'Seeker'], status: 'completed' }
  ],
  teams: [
    { _id: 'team_1', name: 'Neon Reapers', logo: '💀', players: [{ name: 'ShroudX', role: 'Duelist / IGL' }, { name: 'TenZy', role: 'Initiator' }, { name: 'Valkyria', role: 'Sentinel' }], stats: { wins: 45, losses: 12 }, achievements: ['Championship 2025 Winner', 'Vegas Open Finalist'] },
    { _id: 'team_2', name: 'Cyber Phantoms', logo: '👻', players: [{ name: 'Aces', role: 'IGL / Controller' }, { name: 'Zephyr', role: 'Duelist' }, { name: 'Nix', role: 'Initiator' }], stats: { wins: 38, losses: 19 }, achievements: ['Winter Invitational 2025 Runner-up'] }
  ],
  products: [
    { id: 'item_1', title: 'GameZone Neon Hoodie', price: 59.99, category: 'Merch', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400', description: 'Premium dark void hoodie with glowing fluorescent pink and cyan screenprint designs.', stock: 50 },
    { id: 'item_2', title: 'RGB Gaming Mouse', price: 79.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=400', description: 'Ultralight wireless gaming mouse featuring 26k DPI, optical switches, and neon RGB base.', stock: 35 },
    { id: 'item_3', title: 'Mechanical Keyboard (Blue Switch)', price: 129.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400', description: 'Hot-swappable mechanical gaming keyboard with aluminum frame and custom per-key backlighting.', stock: 20 },
    { id: 'item_4', title: 'GameZone Neon Cap', price: 24.99, category: 'Merch', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=400', description: 'Structured snapback featuring 3D embroidered retro gaming patch.', stock: 100 }
  ],
  news: [
    { _id: 'news_1', title: 'Cyberpunk Expansion Announced', summary: 'Developers reveal a massive new expansion set to release late this year.', content: 'The new expansion will take players to a brand new sector of Night City, introducing new characters, weapons, and a branching cyber-thriller storyline.', author: 'CyberEditor', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600', date: '2026-06-11', category: 'Updates' },
    { _id: 'news_2', title: 'Valorant Patch Notes 10.05', summary: 'New agent balances, map updates, and UI enhancements detailed here.', content: 'Agent changes are coming in hot this patch, with tweaks to Flash capabilities and Sentinel setups.', author: 'TacticalReporter', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600', date: '2026-06-09', category: 'Patches' }
  ],
  leaderboard: [
    { rank: 1, username: 'AimGod_V', points: 2850, winRate: '78%', gamesPlayed: 120 },
    { rank: 2, username: 'CyberSamurai', points: 2640, winRate: '72%', gamesPlayed: 145 },
    { rank: 3, username: 'NinjaLoot', points: 2510, winRate: '69%', gamesPlayed: 110 }
  ],
  chat: [
    { username: 'System', message: 'Welcome to the GameZone Chatroom! Play, compete, connect.', timestamp: new Date() },
    { username: 'gamer1', message: 'Hey anyone up for a Valorant game tonight?', timestamp: new Date(Date.now() - 600000) }
  ],
  forums: [
    { _id: 'forum_1', type: 'forum', title: 'Best gaming mouse for FPS in 2026?', username: 'gamer1', message: 'Looking to upgrade my mouse. Should I go wireless or wired?', timestamp: new Date('2026-06-11T12:00:00Z'), replies: [{ username: 'AimGod_V', message: 'Go wireless! Technology is flawless now.', timestamp: new Date('2026-06-11T12:30:00Z') }] }
  ]
};

// Initialize browser storage if using local mode
if (!localStorage.getItem('gamezone_local_games')) localStorage.setItem('gamezone_local_games', JSON.stringify(LOCAL_MOCKS.games));
if (!localStorage.getItem('gamezone_local_tours')) localStorage.setItem('gamezone_local_tours', JSON.stringify(LOCAL_MOCKS.tournaments));
if (!localStorage.getItem('gamezone_local_orders')) localStorage.setItem('gamezone_local_orders', JSON.stringify([]));
if (!localStorage.getItem('gamezone_local_forums')) localStorage.setItem('gamezone_local_forums', JSON.stringify(LOCAL_MOCKS.forums));
if (!localStorage.getItem('gamezone_local_chat')) localStorage.setItem('gamezone_local_chat', JSON.stringify(LOCAL_MOCKS.chat));

// SafeFetch abstraction wrapper to catch offline/file:// instances
window.safeFetch = async function(url, options = {}) {
  const isFileScheme = window.location.protocol === 'file:';
  
  if (!isFileScheme) {
    try {
      const res = await fetch(url, options);
      return res;
    } catch (e) {
      console.warn("Express backend offline. Switching to client-side database mockup fallback.");
    }
  }

  // Intercepting and simulating JSON response payloads
  const path = url.replace(API_BASE, '');
  let responseBody = null;
  let status = 200;

  if (path.startsWith('/api/games')) {
    let localGames = JSON.parse(localStorage.getItem('gamezone_local_games'));
    
    if (path.includes('/rate')) {
      const id = path.split('/')[3];
      const rating = JSON.parse(options.body).rating;
      const gameIdx = localGames.findIndex(g => g._id === id);
      if (gameIdx !== -1) {
        localGames[gameIdx].rating = Number(((localGames[gameIdx].rating + rating) / 2).toFixed(1));
        localStorage.setItem('gamezone_local_games', JSON.stringify(localGames));
        responseBody = { message: 'Rating updated', rating: localGames[gameIdx].rating };
      }
    } else {
      const urlObj = new URL(url, 'http://localhost');
      const search = urlObj.searchParams.get('search');
      const category = urlObj.searchParams.get('category');
      
      let filtered = localGames;
      if (category) filtered = filtered.filter(g => g.category === category);
      if (search) filtered = filtered.filter(g => g.title.toLowerCase().includes(search.toLowerCase()));
      responseBody = filtered;
    }
  } 
  
  else if (path.startsWith('/api/tournaments')) {
    let localTours = JSON.parse(localStorage.getItem('gamezone_local_tours'));
    
    if (path.includes('/register')) {
      const id = path.split('/')[3];
      const tourIdx = localTours.findIndex(t => t._id === id);
      const userStr = localStorage.getItem('gamezone_user') || '{"username":"gamer1"}';
      const username = JSON.parse(userStr).username;
      
      if (tourIdx !== -1) {
        if (!localTours[tourIdx].registeredTeams.includes(username)) {
          localTours[tourIdx].registeredTeams.push(username);
          localStorage.setItem('gamezone_local_tours', JSON.stringify(localTours));
          
          // Also link to user locally
          let userRegs = JSON.parse(localStorage.getItem('gamezone_local_regs') || '[]');
          userRegs.push(id);
          localStorage.setItem('gamezone_local_regs', JSON.stringify(userRegs));
        }
        responseBody = { message: 'Registered successfully', tournamentId: id };
      }
    } else {
      responseBody = localTours;
    }
  } 
  
  else if (path.startsWith('/api/teams')) {
    responseBody = LOCAL_MOCKS.teams;
  } 
  
  else if (path.startsWith('/api/store/products')) {
    responseBody = LOCAL_MOCKS.products;
  } 
  
  else if (path.startsWith('/api/store/checkout')) {
    const items = JSON.parse(options.body).cartItems;
    let localOrders = JSON.parse(localStorage.getItem('gamezone_local_orders'));
    const totalAmount = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    
    const newOrder = {
      _id: 'order_' + Math.random().toString(36).substr(2, 9),
      userId: 'user_local',
      username: 'gamer1',
      items,
      totalAmount,
      status: 'completed',
      createdAt: new Date()
    };
    localOrders.push(newOrder);
    localStorage.setItem('gamezone_local_orders', JSON.stringify(localOrders));
    responseBody = { message: 'Order placed', order: newOrder };
  } 
  
  else if (path.startsWith('/api/news')) {
    responseBody = LOCAL_MOCKS.news;
  } 
  
  else if (path.startsWith('/api/leaderboard')) {
    responseBody = LOCAL_MOCKS.leaderboard;
  }

  else if (path.startsWith('/api/community/chat')) {
    let localChat = JSON.parse(localStorage.getItem('gamezone_local_chat'));
    if (options.method === 'POST') {
      const message = JSON.parse(options.body).message;
      const userStr = localStorage.getItem('gamezone_user') || '{"username":"gamer1"}';
      const username = JSON.parse(userStr).username;
      
      const newMsg = { username, message, timestamp: new Date() };
      localChat.push(newMsg);
      localStorage.setItem('gamezone_local_chat', JSON.stringify(localChat));
      responseBody = newMsg;

      // Simulate bot response after a short timeout
      setTimeout(() => {
        const botName = ['FragMaster', 'ShadowSniper', 'LagLord', 'LootGoblin'][Math.floor(Math.random() * 4)];
        const botMsg = ['Nice!', 'Ready for another tournament?', 'Lag is real today.', 'GG!'][Math.floor(Math.random() * 4)];
        let chatLogs = JSON.parse(localStorage.getItem('gamezone_local_chat'));
        chatLogs.push({ username: botName, message: botMsg, timestamp: new Date() });
        localStorage.setItem('gamezone_local_chat', JSON.stringify(chatLogs));
      }, 2000);
    } else {
      responseBody = localChat;
    }
  }

  else if (path.startsWith('/api/community/forum')) {
    let localForums = JSON.parse(localStorage.getItem('gamezone_local_forums'));
    
    if (path.includes('/reply')) {
      const id = path.split('/')[4];
      const message = JSON.parse(options.body).message;
      const userStr = localStorage.getItem('gamezone_user') || '{"username":"gamer1"}';
      const username = JSON.parse(userStr).username;
      
      const forumIdx = localForums.findIndex(f => f._id === id);
      if (forumIdx !== -1) {
        localForums[forumIdx].replies.push({ username, message, timestamp: new Date() });
        localStorage.setItem('gamezone_local_forums', JSON.stringify(localForums));
        responseBody = { message: 'Reply posted', thread: localForums[forumIdx] };
      }
    } else if (options.method === 'POST') {
      const { title, message } = JSON.parse(options.body);
      const userStr = localStorage.getItem('gamezone_user') || '{"username":"gamer1"}';
      const username = JSON.parse(userStr).username;
      
      const newThread = {
        _id: 'forum_' + Math.random().toString(36).substr(2, 9),
        type: 'forum',
        title,
        message,
        username,
        timestamp: new Date(),
        replies: []
      };
      localForums.push(newThread);
      localStorage.setItem('gamezone_local_forums', JSON.stringify(localForums));
      responseBody = newThread;
    } else {
      responseBody = localForums;
    }
  }

  else if (path.startsWith('/api/auth/login')) {
    const { username, password } = JSON.parse(options.body);
    if ((username === 'admin' && password === 'admin123') || (username === 'gamer1' && password === 'user123')) {
      const role = username === 'admin' ? 'admin' : 'user';
      responseBody = {
        token: 'mock_jwt_token_local_execution',
        user: { id: 'user_local', username, email: `${username}@gamezone.com`, role }
      };
    } else {
      status = 400;
      responseBody = { message: 'Invalid local mock credentials' };
    }
  }

  else if (path.startsWith('/api/auth/register')) {
    const { username, email } = JSON.parse(options.body);
    responseBody = {
      token: 'mock_jwt_token_local_execution',
      user: { id: 'user_local_new', username, email, role: 'user' }
    };
  }

  else if (path.startsWith('/api/dashboard/summary')) {
    const userStr = localStorage.getItem('gamezone_user') || '{"username":"gamer1","email":"gamer1@gamezone.com","role":"user"}';
    const user = JSON.parse(userStr);
    
    // Registered Tournaments
    let localTours = JSON.parse(localStorage.getItem('gamezone_local_tours'));
    const registeredTournaments = localTours.filter(t => t.registeredTeams.includes(user.username));

    // Orders
    let localOrders = JSON.parse(localStorage.getItem('gamezone_local_orders'));

    responseBody = {
      user: { username: user.username, email: user.email, role: user.role, createdAt: new Date('2026-01-01') },
      tournaments: registeredTournaments,
      orders: localOrders
    };
  }

  else if (path.startsWith('/api/admin/stats')) {
    let localGames = JSON.parse(localStorage.getItem('gamezone_local_games'));
    let localTours = JSON.parse(localStorage.getItem('gamezone_local_tours'));
    let localOrders = JSON.parse(localStorage.getItem('gamezone_local_orders'));
    
    const revenue = localOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    responseBody = {
      metrics: {
        totalUsers: 14,
        totalGames: localGames.length,
        totalTournaments: localTours.length,
        totalOrders: localOrders.length,
        totalRevenue: revenue
      },
      users: [
        { id: 'user_1', username: 'admin', email: 'admin@gamezone.com', role: 'admin', createdAt: new Date() },
        { id: 'user_2', username: 'gamer1', email: 'gamer1@gamezone.com', role: 'user', createdAt: new Date() }
      ],
      games: localGames,
      tournaments: localTours
    };
  }

  return new Response(JSON.stringify(responseBody), {
    status: status,
    headers: { 'Content-Type': 'application/json' }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initAuthNavbar();
  initMobileNav();
  initCart();
  initChatbot();
});

// ==========================================
// 1. AUTHENTICATION & NAVBAR CONTROL
// ==========================================
function getAuthHeaders() {
  const token = localStorage.getItem('gamezone_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

function initAuthNavbar() {
  const token = localStorage.getItem('gamezone_token');
  const userStr = localStorage.getItem('gamezone_user');
  const navRight = document.querySelector('.nav-right');
  const navLinks = document.querySelector('.nav-links');

  if (!navRight || !navLinks) return;

  const authBtns = navRight.querySelectorAll('.user-menu-btn, .btn-auth-nav');
  authBtns.forEach(btn => btn.remove());

  const profileLinks = navLinks.querySelectorAll('.nav-link-dynamic');
  profileLinks.forEach(link => link.remove());

  if (token && userStr) {
    const user = JSON.parse(userStr);
    
    const dashboardLi = document.createElement('li');
    dashboardLi.className = 'nav-link-dynamic';
    dashboardLi.innerHTML = `<a href="dashboard.html" id="nav-dashboard">Dashboard</a>`;
    navLinks.appendChild(dashboardLi);

    if (user.role === 'admin') {
      const adminLi = document.createElement('li');
      adminLi.className = 'nav-link-dynamic';
      adminLi.innerHTML = `<a href="admin.html" id="nav-admin">Admin</a>`;
      navLinks.appendChild(adminLi);
    }

    const filename = window.location.pathname.split('/').pop();
    if (filename === 'dashboard.html') {
      document.getElementById('nav-dashboard')?.classList.add('active');
    } else if (filename === 'admin.html') {
      document.getElementById('nav-admin')?.classList.add('active');
    }

    const profileBtn = document.createElement('button');
    profileBtn.className = 'user-menu-btn';
    profileBtn.innerHTML = `👤 ${user.username} <span style="font-size:0.8rem;color:var(--neon-pink);">(Logout)</span>`;
    profileBtn.addEventListener('click', () => {
      logout();
    });
    navRight.appendChild(profileBtn);
  } else {
    const loginLink = document.createElement('a');
    loginLink.href = 'login.html';
    loginLink.className = 'btn btn-cyan btn-auth-nav';
    loginLink.style.padding = '0.4rem 1rem';
    loginLink.innerHTML = 'Login';
    navRight.appendChild(loginLink);
  }
}

function logout() {
  localStorage.removeItem('gamezone_token');
  localStorage.removeItem('gamezone_user');
  showToast('Logged out successfully', 'cyan');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

// ==========================================
// 2. MOBILE NAVIGATION DRAWER
// ==========================================
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ==========================================
// 3. SHOPPING CART FUNCTIONALITY
// ==========================================
let cart = [];

function initCart() {
  const cartBtn = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartClose = document.getElementById('cart-close');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const checkoutBtn = document.getElementById('cart-checkout-btn');

  if (cartBtn && cartDrawer && cartClose && cartBackdrop) {
    cartBtn.addEventListener('click', () => toggleCart(true));
    cartClose.addEventListener('click', () => toggleCart(false));
    cartBackdrop.addEventListener('click', () => toggleCart(false));
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => checkoutCart());
  }

  const storedCart = localStorage.getItem('gamezone_cart');
  if (storedCart) {
    try {
      cart = JSON.parse(storedCart);
    } catch (e) {
      cart = [];
    }
  }

  updateCartUI();
}

function toggleCart(open) {
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  if (!cartDrawer || !cartBackdrop) return;

  if (open) {
    cartDrawer.classList.add('open');
    cartBackdrop.style.display = 'block';
  } else {
    cartDrawer.classList.remove('open');
    cartBackdrop.style.display = 'none';
  }
}

window.addToCart = function(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  toggleCart(true);
  showToast(`Added ${product.title} to cart`, 'cyan');
};

function changeQty(id, delta) {
  const item = cart.find(item => item.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('gamezone_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const badge = document.getElementById('cart-count');
  const container = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('cart-total');

  if (badge) {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  if (!container) return;

  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--text-muted);">Your cart is empty.</div>`;
    if (totalPriceEl) totalPriceEl.textContent = '$0.00';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.title}</h4>
        <span class="cart-item-price">$${item.price.toFixed(2)}</span>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
        </div>
      </div>
      <div class="cart-item-remove" onclick="removeFromCart('${item.id}')">🗑️</div>
    `;
    container.appendChild(div);
  });

  if (totalPriceEl) {
    totalPriceEl.textContent = `$${total.toFixed(2)}`;
  }
}

async function checkoutCart() {
  const token = localStorage.getItem('gamezone_token');
  if (!token) {
    showToast('Please login to checkout items', 'pink');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
    return;
  }

  if (cart.length === 0) {
    showToast('Your cart is empty', 'pink');
    return;
  }

  try {
    const res = await window.safeFetch(`${API_BASE}/api/store/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ cartItems: cart })
    });

    const data = await res.json();
    if (res.ok) {
      showToast('Order placed successfully!', 'cyan');
      cart = [];
      saveCart();
      updateCartUI();
      toggleCart(false);
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    } else {
      showToast(data.message || 'Checkout failed', 'pink');
    }
  } catch (err) {
    console.error(err);
    showToast('Server communication error', 'pink');
  }
}

window.changeQty = changeQty;
window.removeFromCart = removeFromCart;

// ==========================================
// 4. FLOATING AI CHATBOT HELP ASSISTANT
// ==========================================
function initChatbot() {
  const bubble = document.getElementById('chatbot-bubble');
  const windowEl = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const msgsContainer = document.getElementById('chatbot-messages');

  if (!bubble || !windowEl || !closeBtn || !form || !input || !msgsContainer) return;

  bubble.addEventListener('click', () => {
    windowEl.classList.toggle('open');
    if (windowEl.classList.contains('open')) {
      input.focus();
      if (msgsContainer.children.length === 0) {
        addBotMessage("Greetings, gamer! I am GZ-Helper. Type 'help' to see what I can do!");
      }
    }
  });

  closeBtn.addEventListener('click', () => {
    windowEl.classList.remove('open');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    addUserMessage(query);
    input.value = '';

    setTimeout(() => {
      processBotReply(query.toLowerCase());
    }, 600);
  });
}

function addUserMessage(txt) {
  const msgsContainer = document.getElementById('chatbot-messages');
  const div = document.createElement('div');
  div.className = 'chatbot-msg user';
  div.textContent = txt;
  msgsContainer.appendChild(div);
  msgsContainer.scrollTop = msgsContainer.scrollHeight;
}

function addBotMessage(txt) {
  const msgsContainer = document.getElementById('chatbot-messages');
  const div = document.createElement('div');
  div.className = 'chatbot-msg bot';
  div.innerHTML = txt;
  msgsContainer.appendChild(div);
  msgsContainer.scrollTop = msgsContainer.scrollHeight;
}

function processBotReply(q) {
  if (q.includes('help')) {
    addBotMessage(`Available Commands:<br>
      - <b>games</b>: list current games<br>
      - <b>tournaments</b>: check active matches<br>
      - <b>merch</b>: check store merchandise<br>
      - <b>cart</b>: view cart status<br>
      - <b>about</b>: what is GameZone Hub?`);
  } else if (q.includes('game')) {
    addBotMessage(`We have top titles like Apex Legends, Cyberpunk 2077, Valorant, and Elden Ring. Go to the <a href="games.html">Games Section</a> to explore!`);
  } else if (q.includes('tournament') || q.includes('compete') || q.includes('bracket')) {
    addBotMessage(`Compete in our next esports tournaments! View open brackets and book slots in the <a href="tournaments.html">Tournaments Section</a>.`);
  } else if (q.includes('store') || q.includes('merch') || q.includes('accessories') || q.includes('hoodie')) {
    addBotMessage(`Upgrade your battlestation with mechanical keyboards and RGB mice, or buy hoodies in the <a href="store.html">Store</a>!`);
  } else if (q.includes('cart')) {
    const qty = cart.reduce((sum, item) => sum + item.quantity, 0);
    addBotMessage(`You currently have <b>${qty}</b> items in your cart. You can open the cart by clicking the icon in the navigation bar.`);
  } else if (q.includes('about')) {
    addBotMessage(`GameZone Hub is the premier social platform for gamers. We provide game ratings, competitive tournaments, team rosters, merch store, and community boards.`);
  } else if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    addBotMessage(`Hello Champion! Ready to dominate the lobbies today? Let me know if you need info on games, tournaments, or merchandise.`);
  } else {
    addBotMessage(`I'm not sure about that. Type <b>'help'</b> to see a list of things I can assist you with!`);
  }
}

// ==========================================
// 5. TOAST NOTIFICATION UTILITY
// ==========================================
window.showToast = function(msg, type = 'cyan') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.left = '20px';
    container.style.zIndex = '9999';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `badge badge-${type}`;
  toast.style.padding = '0.8rem 1.5rem';
  toast.style.borderRadius = '4px';
  toast.style.fontSize = '1rem';
  toast.style.boxShadow = type === 'pink' ? 'var(--glow-pink)' : 'var(--glow-cyan)';
  toast.style.animation = 'float 2s infinite ease-in-out';
  toast.textContent = msg;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
};
