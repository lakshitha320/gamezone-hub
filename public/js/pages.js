// ==========================================
// GAMEZONE HUB PAGE-SPECIFIC CONTROLLERS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const filename = window.location.pathname.split('/').pop() || 'index.html';

  if (filename === 'index.html') {
    initHomePage();
  } else if (filename === 'games.html') {
    initGamesPage();
  } else if (filename === 'tournaments.html') {
    initTournamentsPage();
  } else if (filename === 'teams.html') {
    initTeamsPage();
  } else if (filename === 'store.html') {
    initStorePage();
  } else if (filename === 'news.html') {
    initNewsPage();
  } else if (filename === 'community.html') {
    initCommunityPage();
  } else if (filename === 'login.html') {
    initLoginPage();
  } else if (filename === 'register.html') {
    initRegisterPage();
  } else if (filename === 'dashboard.html') {
    initDashboardPage();
  } else if (filename === 'admin.html') {
    initAdminPage();
  }
});

// ==========================================
// 1. HOME PAGE CONTROLLER
// ==========================================
async function initHomePage() {
  const gamesContainer = document.getElementById('featured-games-container');
  const newsContainer = document.getElementById('latest-news-container');

  // Load featured games (Limit to 3)
  try {
    const res = await window.safeFetch(`${API_BASE}/api/games`);
    const games = await res.json();
    if (res.ok && gamesContainer) {
      gamesContainer.innerHTML = '';
      games.slice(0, 3).forEach(game => {
        const card = document.createElement('div');
        card.className = 'card game-card';
        card.innerHTML = `
          <div class="game-img-container">
            <img src="${game.image}" alt="${game.title}" class="game-img">
          </div>
          <div class="game-info">
            <div class="game-meta">
              <span class="badge badge-cyan">${game.category}</span>
              <span class="game-rating">⭐ ${game.rating || 0}</span>
            </div>
            <h3 class="game-title">${game.title}</h3>
            <p class="game-desc">${game.description}</p>
            <div class="game-footer">
              <span class="game-price">${game.price === 0 ? 'FREE' : `$${game.price.toFixed(2)}`}</span>
              <a href="games.html" class="btn btn-cyan" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Explore</a>
            </div>
          </div>
        `;
        gamesContainer.appendChild(card);
      });
    }
  } catch (err) {
    console.error('Error loading homepage games:', err);
  }

  // Load featured news articles (Limit to 3)
  try {
    const res = await window.safeFetch(`${API_BASE}/api/news`);
    const news = await res.json();
    if (res.ok && newsContainer) {
      newsContainer.innerHTML = '';
      news.slice(0, 3).forEach(art => {
        const card = document.createElement('div');
        card.className = 'card game-card';
        card.innerHTML = `
          <div class="game-img-container">
            <img src="${art.image}" alt="${art.title}" class="game-img">
          </div>
          <div class="game-info">
            <div class="game-meta">
              <span class="badge badge-pink">${art.category}</span>
              <span style="font-size:0.9rem; color:var(--text-muted);">${art.date}</span>
            </div>
            <h3 class="game-title">${art.title}</h3>
            <p class="game-desc">${art.summary}</p>
            <div class="game-footer" style="border:none; padding:0;">
              <span style="font-size:0.9rem; color:var(--text-muted);">By ${art.author}</span>
              <a href="news.html" class="btn btn-pink" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Read More</a>
            </div>
          </div>
        `;
        newsContainer.appendChild(card);
      });
    }
  } catch (err) {
    console.error('Error loading homepage news:', err);
  }
}

// ==========================================
// 2. GAMES EXPLORER PAGE CONTROLLER
// ==========================================
let allGamesData = [];

async function initGamesPage() {
  const gamesContainer = document.getElementById('games-explorer-container');
  const searchInput = document.getElementById('game-search');
  const catFilters = document.getElementById('category-filters');

  if (!gamesContainer) return;

  // Load Initial Games
  await loadGames('');

  // Search Input Keyup
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const search = e.target.value.trim();
      loadGames(search);
    });
  }

  // Category Filter Buttons
  if (catFilters) {
    catFilters.querySelectorAll('.filter-category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        catFilters.querySelectorAll('.filter-category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-category');
        loadGames('', category);
      });
    });
  }
}

async function loadGames(search = '', category = 'All') {
  const gamesContainer = document.getElementById('games-explorer-container');
  if (!gamesContainer) return;

  let url = `${API_BASE}/api/games`;
  const params = [];
  if (search) params.push(`search=${encodeURIComponent(search)}`);
  if (category && category !== 'All') params.push(`category=${encodeURIComponent(category)}`);
  if (params.length > 0) url += `?${params.join('&')}`;

  try {
    const res = await window.safeFetch(url);
    const games = await res.json();
    if (res.ok) {
      allGamesData = games;
      gamesContainer.innerHTML = '';
      if (games.length === 0) {
        gamesContainer.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--text-muted);">No games matching filters found.</div>`;
        return;
      }
      games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'card game-card';
        card.innerHTML = `
          <div class="game-img-container">
            <img src="${game.image}" alt="${game.title}" class="game-img">
          </div>
          <div class="game-info">
            <div class="game-meta">
              <span class="badge badge-cyan">${game.category}</span>
              <span class="game-rating">⭐ ${game.rating || 0}</span>
            </div>
            <h3 class="game-title">${game.title}</h3>
            <p class="game-desc">${game.description}</p>
            <div style="font-size:0.95rem; margin-bottom:1rem; color:var(--text-muted);">
              Platform: <b>${game.platform}</b><br>
              Release: <b>${game.releaseDate || 'N/A'}</b>
            </div>
            <div class="game-footer">
              <span class="game-price">${game.price === 0 ? 'FREE' : `$${game.price.toFixed(2)}`}</span>
              <div style="display:flex; align-items:center; gap:0.3rem;">
                <span style="font-size:0.8rem;color:var(--text-muted);">Rate:</span>
                <select onchange="submitGameRating('${game._id}', this.value)" style="background:var(--bg-void); color:var(--text-primary); border:var(--glass-border); padding:0.2rem 0.4rem; border-radius:4px; font-weight:700; cursor:pointer;">
                  <option value="">-</option>
                  <option value="5">5 ★</option>
                  <option value="4">4 ★</option>
                  <option value="3">3 ★</option>
                  <option value="2">2 ★</option>
                  <option value="1">1 ★</option>
                </select>
              </div>
            </div>
          </div>
        `;
        gamesContainer.appendChild(card);
      });
    }
  } catch (err) {
    console.error('Error loading games database:', err);
  }
}

window.submitGameRating = async function(id, ratingVal) {
  if (!ratingVal) return;
  const token = localStorage.getItem('gamezone_token');
  if (!token) {
    showToast('Please login to rate games', 'pink');
    return;
  }

  try {
    const res = await window.safeFetch(`${API_BASE}/api/games/${id}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ rating: Number(ratingVal) })
    });
    const data = await res.json();
    if (res.ok) {
      showToast(`Rating submitted! New average: ${data.rating}`, 'cyan');
      const activeCat = document.querySelector('.filter-category-btn.active')?.getAttribute('data-category') || 'All';
      const search = document.getElementById('game-search')?.value || '';
      loadGames(search, activeCat);
    } else {
      showToast(data.message || 'Error submitting rating', 'pink');
    }
  } catch (err) {
    console.error(err);
    showToast('Communication error with ratings server', 'pink');
  }
};

// ==========================================
// 3. TOURNAMENTS PAGE CONTROLLER
// ==========================================
let selectedTournamentId = null;

async function initTournamentsPage() {
  const container = document.getElementById('tournaments-container');
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('close-booking-modal');
  const cancelBtn = document.getElementById('cancel-booking-btn');
  const confirmBtn = document.getElementById('confirm-booking-btn');

  if (!container) return;

  loadTournaments();

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
  }
  if (cancelBtn && modal) {
    cancelBtn.addEventListener('click', () => modal.style.display = 'none');
  }

  if (confirmBtn && modal) {
    confirmBtn.addEventListener('click', async () => {
      const teamInput = document.getElementById('booking-team-name');
      const teamName = teamInput?.value.trim();
      if (!teamName) {
        showToast('Please enter a player/team tag', 'pink');
        return;
      }

      const token = localStorage.getItem('gamezone_token');
      if (!token) {
        showToast('Please login to register slots', 'pink');
        modal.style.display = 'none';
        return;
      }

      try {
        const res = await window.safeFetch(`${API_BASE}/api/tournaments/${selectedTournamentId}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          },
          body: JSON.stringify({ teamName })
        });

        const data = await res.json();
        if (res.ok) {
          showToast('Registration slot booked!', 'cyan');
          modal.style.display = 'none';
          if (teamInput) teamInput.value = '';
          loadTournaments();
        } else {
          showToast(data.message || 'Registration failed', 'pink');
        }
      } catch (err) {
        console.error(err);
        showToast('Server communication error', 'pink');
      }
    });
  }
}

async function loadTournaments() {
  const container = document.getElementById('tournaments-container');
  if (!container) return;

  try {
    const res = await window.safeFetch(`${API_BASE}/api/tournaments`);
    const tournaments = await res.json();

    if (res.ok) {
      container.innerHTML = '';
      tournaments.forEach(tour => {
        const taken = tour.registeredTeams ? tour.registeredTeams.length : 0;
        const slotsPct = Math.min(100, Math.round((taken / tour.slots) * 100));

        const card = document.createElement('div');
        card.className = `card tournament-card ${tour.status === 'upcoming' ? 'active' : ''}`;
        
        let buttonHTML = '';
        if (tour.status === 'upcoming') {
          buttonHTML = `<button class="btn btn-cyan" style="width:100%;" onclick="openBookingModal('${tour._id}', '${tour.title}')">Register Slot</button>`;
        } else if (tour.status === 'active') {
          buttonHTML = `<div style="text-align:center;font-weight:700;color:var(--neon-pink);">Match in Progress</div>`;
        } else {
          buttonHTML = `<div style="text-align:center;font-weight:700;color:var(--text-muted);">Bracket Completed</div>`;
        }

        card.innerHTML = `
          <div class="tournament-header">
            <span class="badge ${tour.status === 'upcoming' ? 'badge-cyan' : 'badge-pink'}">${tour.status}</span>
            <span style="font-family:var(--font-title); font-weight:700; color:var(--neon-pink);">${tour.prizePool}</span>
          </div>
          <h3 class="tournament-title">${tour.title}</h3>
          <p style="color:var(--neon-cyan); font-weight:700; font-size:0.95rem; margin-bottom:1rem; text-transform:uppercase;">Game: ${tour.game}</p>
          <ul class="tournament-details">
            <li>
              <span class="label">Date</span>
              <span class="val">${tour.date}</span>
            </li>
            <li>
              <span class="label">Time</span>
              <span class="val">${tour.time}</span>
            </li>
            <li>
              <span class="label">Slots Booked</span>
              <span class="val">${taken} / ${tour.slots}</span>
            </li>
          </ul>
          <div class="tournament-slots-bar">
            <div class="tournament-slots-progress" style="width: ${slotsPct}%;"></div>
          </div>
          ${buttonHTML}
        `;
        container.appendChild(card);
      });
    }
  } catch (err) {
    console.error('Error loading tournaments:', err);
  }
}

window.openBookingModal = function(id, title) {
  const token = localStorage.getItem('gamezone_token');
  if (!token) {
    showToast('Please login to register for tournaments', 'pink');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
    return;
  }

  selectedTournamentId = id;
  const modal = document.getElementById('booking-modal');
  const modalTitle = document.getElementById('booking-modal-title');
  if (modal && modalTitle) {
    modalTitle.textContent = `Register: ${title}`;
    modal.style.display = 'flex';
  }
};

// ==========================================
// 4. ESPORTS TEAMS PAGE CONTROLLER
// ==========================================
let activeTeams = [];

async function initTeamsPage() {
  const container = document.getElementById('teams-container');
  const modal = document.getElementById('roster-modal');
  const closeBtn = document.getElementById('close-roster-modal');
  const cancelBtn = document.getElementById('close-roster-btn');

  if (!container) return;

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
  }
  if (cancelBtn && modal) {
    cancelBtn.addEventListener('click', () => modal.style.display = 'none');
  }

  try {
    const res = await window.safeFetch(`${API_BASE}/api/teams`);
    const teams = await res.json();
    if (res.ok) {
      activeTeams = teams;
      container.innerHTML = '';
      teams.forEach(team => {
        const card = document.createElement('div');
        card.className = 'card game-card';
        
        let achievementsLi = '';
        team.achievements.slice(0, 2).forEach(ach => {
          achievementsLi += `<li style="font-size:0.95rem;color:var(--text-muted);">🏆 ${ach}</li>`;
        });

        card.innerHTML = `
          <div style="font-size:4rem; text-align:center; margin-bottom:1rem; text-shadow:var(--glow-cyan);">${team.logo || '🛡️'}</div>
          <div class="game-info" style="flex-grow:1; display:flex; flex-direction:column;">
            <h3 class="game-title" style="text-align:center;margin-bottom:0.5rem;">${team.name}</h3>
            <p style="text-align:center;font-size:1.1rem;color:var(--neon-cyan);margin-bottom:1.5rem;font-weight:700;">
              Wins: <span style="color:var(--neon-green);">${team.stats.wins}</span> &nbsp;|&nbsp; Losses: <span style="color:var(--neon-pink);">${team.stats.losses}</span>
            </p>
            <div style="flex-grow:1; margin-bottom:1.5rem;">
              <h4 style="font-size:0.9rem;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.5rem;">Key Achievements</h4>
              <ul style="list-style:none;padding-left:0.2rem;display:flex;flex-direction:column;gap:0.4rem;">
                ${achievementsLi}
              </ul>
            </div>
            <button class="btn btn-cyan" style="width:100%;margin-top:auto;" onclick="openRosterModal('${team._id}')">View Roster</button>
          </div>
        `;
        container.appendChild(card);
      });
    }
  } catch (err) {
    console.error('Error loading teams:', err);
  }
}

window.openRosterModal = function(id) {
  const team = activeTeams.find(t => t._id === id);
  if (!team) return;

  const modal = document.getElementById('roster-modal');
  const modalTitle = document.getElementById('roster-modal-title');
  const modalBody = document.getElementById('roster-modal-body');

  if (modal && modalTitle && modalBody) {
    modalTitle.textContent = `${team.name} Lineup`;
    modalBody.innerHTML = '';

    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = '0.8rem';

    team.players.forEach(p => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justify = 'space-between';
      li.style.padding = '0.5rem 0';
      li.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
      li.innerHTML = `<span style="font-family:var(--font-title);font-weight:700;color:var(--neon-cyan);">${p.name}</span> <span style="font-size:0.95rem;color:var(--text-muted);">${p.role}</span>`;
      list.appendChild(li);
    });

    modalBody.appendChild(list);
    modal.style.display = 'flex';
  }
};

// ==========================================
// 5. STORE MERCHANDISE PAGE CONTROLLER
// ==========================================
let allStoreProducts = [];

async function initStorePage() {
  const container = document.getElementById('store-products-container');
  const tabs = document.querySelectorAll('.store-tab-btn');

  if (!container) return;

  try {
    const res = await window.safeFetch(`${API_BASE}/api/store/products`);
    const products = await res.json();
    if (res.ok) {
      allStoreProducts = products;
      renderStoreItems(products);
    }
  } catch (err) {
    console.error(err);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-tab');

      if (category === 'All') {
        renderStoreItems(allStoreProducts);
      } else {
        const filtered = allStoreProducts.filter(p => p.category === category);
        renderStoreItems(filtered);
      }
    });
  });
}

function renderStoreItems(products) {
  const container = document.getElementById('store-products-container');
  if (!container) return;

  container.innerHTML = '';
  if (products.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--text-muted);">No merchandise available in this category.</div>`;
    return;
  }

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card game-card';
    card.innerHTML = `
      <div class="game-img-container">
        <img src="${p.image}" alt="${p.title}" class="game-img">
      </div>
      <div class="game-info">
        <div class="game-meta">
          <span class="badge badge-pink">${p.category}</span>
          <span style="font-size:0.95rem;color:var(--neon-green);">In Stock</span>
        </div>
        <h3 class="game-title">${p.title}</h3>
        <p class="game-desc">${p.description}</p>
        <div class="game-footer">
          <span class="game-price">$${p.price.toFixed(2)}</span>
          <button class="btn btn-cyan" onclick="triggerAddToCart('${p.id}')">Add To Cart</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

window.triggerAddToCart = function(id) {
  const product = allStoreProducts.find(p => p.id === id);
  if (product) {
    window.addToCart(product);
  }
};

// ==========================================
// 6. NEWS ARTICLE PAGE CONTROLLER
// ==========================================
let activeArticles = [];

async function initNewsPage() {
  const container = document.getElementById('news-explorer-container');
  const modal = document.getElementById('news-modal');
  const closeBtn = document.getElementById('close-news-modal');
  const cancelBtn = document.getElementById('close-news-btn');

  if (!container) return;

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
  }
  if (cancelBtn && modal) {
    cancelBtn.addEventListener('click', () => modal.style.display = 'none');
  }

  try {
    const res = await window.safeFetch(`${API_BASE}/api/news`);
    const articles = await res.json();

    if (res.ok) {
      activeArticles = articles;
      container.innerHTML = '';
      articles.forEach(art => {
        const card = document.createElement('div');
        card.className = 'card game-card';
        card.innerHTML = `
          <div class="game-img-container">
            <img src="${art.image}" alt="${art.title}" class="game-img">
          </div>
          <div class="game-info">
            <div class="game-meta">
              <span class="badge badge-cyan">${art.category}</span>
              <span style="font-size:0.9rem;color:var(--text-muted);">${art.date}</span>
            </div>
            <h3 class="game-title">${art.title}</h3>
            <p class="game-desc">${art.summary}</p>
            <div class="game-footer">
              <span style="font-size:0.9rem;color:var(--text-muted);">By ${art.author}</span>
              <button class="btn btn-pink" onclick="openNewsModal('${art._id}')">Read Full</button>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

window.openNewsModal = function(id) {
  const art = activeArticles.find(a => a._id === id);
  if (!art) return;

  const modal = document.getElementById('news-modal');
  const modalTitle = document.getElementById('news-modal-title');
  const modalBody = document.getElementById('news-modal-body');

  if (modal && modalTitle && modalBody) {
    modalTitle.textContent = art.title;
    modalBody.innerHTML = `
      <div class="game-img-container" style="height:300px; margin-bottom:1.5rem; border-radius:4px; border:var(--glass-border);">
        <img src="${art.image}" alt="${art.title}" class="game-img">
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:1rem;font-size:0.95rem;color:var(--text-muted);">
        <span>Category: <b style="color:var(--neon-pink);">${art.category}</b></span>
        <span>Date: <b>${art.date}</b> | Author: <b>${art.author}</b></span>
      </div>
      <p style="font-size:1.15rem;font-weight:600;margin-bottom:1rem;color:var(--neon-cyan);line-height:1.4;">${art.summary}</p>
      <div style="color:var(--text-primary);line-height:1.7;white-space:pre-line;">${art.content}</div>
    `;
    modal.style.display = 'flex';
  }
};

// ==========================================
// 7. COMMUNITY PAGES CONTROLLER (FORUMS & LOBBY CHAT)
// ==========================================
let forumThreads = [];
let pollingInterval = null;

async function initCommunityPage() {
  const forumContainer = document.getElementById('forum-threads-container');
  const chatMessages = document.getElementById('lobby-messages-container');
  const threadTrigger = document.getElementById('new-thread-trigger-btn');
  const threadModal = document.getElementById('thread-modal');
  const cancelThread = document.getElementById('cancel-thread-btn');
  const closeThread = document.getElementById('close-thread-modal');
  const createThreadForm = document.getElementById('create-thread-form');
  const chatForm = document.getElementById('lobby-chat-form');
  const detailModal = document.getElementById('forum-detail-modal');
  const closeDetail = document.getElementById('close-forum-detail-modal');
  const replyForm = document.getElementById('forum-reply-form');

  if (!forumContainer || !chatMessages) return;

  loadForumThreads();
  loadLobbyChat();

  pollingInterval = setInterval(() => {
    loadLobbyChat();
  }, 3000);

  window.addEventListener('beforeunload', () => {
    if (pollingInterval) clearInterval(pollingInterval);
  });

  if (threadTrigger) {
    threadTrigger.addEventListener('click', () => {
      const token = localStorage.getItem('gamezone_token');
      if (!token) {
        showToast('Please login to create threads', 'pink');
        setTimeout(() => window.location.href = 'login.html', 1500);
        return;
      }
      if (threadModal) threadModal.style.display = 'flex';
    });
  }

  if (cancelThread && threadModal) cancelThread.addEventListener('click', () => threadModal.style.display = 'none');
  if (closeThread && threadModal) closeThread.addEventListener('click', () => threadModal.style.display = 'none');
  if (closeDetail && detailModal) closeDetail.addEventListener('click', () => detailModal.style.display = 'none');

  if (createThreadForm) {
    createThreadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('thread-title-input').value;
      const message = document.getElementById('thread-desc-input').value;

      try {
        const res = await window.safeFetch(`${API_BASE}/api/community/forum`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          },
          body: JSON.stringify({ title, message })
        });

        if (res.ok) {
          showToast('Forum thread published!', 'cyan');
          if (threadModal) threadModal.style.display = 'none';
          createThreadForm.reset();
          loadForumThreads();
        } else {
          const data = await res.json();
          showToast(data.message || 'Error creating thread', 'pink');
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  if (replyForm) {
    replyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('forum-thread-id').value;
      const input = document.getElementById('forum-reply-input');
      const message = input.value;

      try {
        const res = await window.safeFetch(`${API_BASE}/api/community/forum/${id}/reply`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          },
          body: JSON.stringify({ message })
        });

        if (res.ok) {
          showToast('Reply posted!', 'cyan');
          input.value = '';
          openForumDetailModal(id);
          loadForumThreads();
        } else {
          const data = await res.json();
          showToast(data.message || 'Error posting reply', 'pink');
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = document.getElementById('lobby-chat-input');
      const message = input.value.trim();
      if (!message) return;

      const token = localStorage.getItem('gamezone_token');
      if (!token) {
        showToast('Please login to chat', 'pink');
        return;
      }

      try {
        const res = await window.safeFetch(`${API_BASE}/api/community/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          },
          body: JSON.stringify({ message })
        });

        if (res.ok) {
          input.value = '';
          loadLobbyChat();
        }
      } catch (err) {
        console.error(err);
      }
    });
  }
}

async function loadForumThreads() {
  const container = document.getElementById('forum-threads-container');
  if (!container) return;

  try {
    const res = await window.safeFetch(`${API_BASE}/api/community/forum`);
    const threads = await res.json();

    if (res.ok) {
      forumThreads = threads;
      container.innerHTML = '';
      if (threads.length === 0) {
        container.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--text-muted);">No discussion threads found. Start one!</div>`;
        return;
      }

      threads.forEach(th => {
        const dateStr = new Date(th.timestamp).toLocaleString();
        const repliesCount = th.replies ? th.replies.length : 0;

        const card = document.createElement('div');
        card.className = 'card thread-card';
        card.onclick = () => openForumDetailModal(th._id);
        card.innerHTML = `
          <div class="thread-header">
            <h4 class="thread-title">${th.title}</h4>
            <span class="replies-count">💬 ${repliesCount} replies</span>
          </div>
          <div class="thread-meta">Published by <b>${th.username}</b> on ${dateStr}</div>
          <p class="thread-content">${th.message.substring(0, 160)}${th.message.length > 160 ? '...' : ''}</p>
        `;
        container.appendChild(card);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

async function openForumDetailModal(id) {
  const modal = document.getElementById('forum-detail-modal');
  const titleEl = document.getElementById('forum-detail-title');
  const bodyEl = document.getElementById('forum-detail-body');
  const threadIdInput = document.getElementById('forum-thread-id');

  if (!modal || !titleEl || !bodyEl || !threadIdInput) return;

  try {
    const res = await window.safeFetch(`${API_BASE}/api/community/forum`);
    const threads = await res.json();
    const thread = threads.find(t => t._id === id);

    if (thread) {
      threadIdInput.value = id;
      titleEl.textContent = thread.title;

      let repliesHTML = '';
      if (thread.replies && thread.replies.length > 0) {
        thread.replies.forEach(rep => {
          const rDate = new Date(rep.timestamp).toLocaleTimeString();
          repliesHTML += `
            <div style="background:rgba(255,255,255,0.02); padding:0.8rem; border-radius:4px; border-left:2px solid var(--neon-pink); margin-bottom:0.8rem;">
              <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.3rem;">
                <b>${rep.username}</b> &bull; ${rDate}
              </div>
              <p style="font-size:0.95rem;">${rep.message}</p>
            </div>
          `;
        });
      } else {
        repliesHTML = `<div style="text-align:center;color:var(--text-muted);font-size:0.9rem;padding:1rem;">No replies yet. Be the first to reply!</div>`;
      }

      bodyEl.innerHTML = `
        <div style="border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:1rem; margin-bottom:1.5rem;">
          <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.5rem;">
            Published by <b style="color:var(--neon-cyan);">${thread.username}</b>
          </div>
          <p style="font-size:1.1rem; line-height:1.5;">${thread.message}</p>
        </div>
        <h4 style="font-family:var(--font-title); font-size:0.9rem; text-transform:uppercase; margin-bottom:1rem; color:var(--neon-pink);">Replies</h4>
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          ${repliesHTML}
        </div>
      `;

      modal.style.display = 'flex';
    }
  } catch (e) {
    console.error(e);
  }
}

async function loadLobbyChat() {
  const chatMessages = document.getElementById('lobby-messages-container');
  if (!chatMessages) return;

  try {
    const res = await window.safeFetch(`${API_BASE}/api/community/chat`);
    const messages = await res.json();

    if (res.ok) {
      const isScrolledToBottom = chatMessages.scrollHeight - chatMessages.clientHeight <= chatMessages.scrollTop + 50;

      chatMessages.innerHTML = '';
      messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = 'chat-message';
        const isSys = msg.username === 'System';
        const isAdm = msg.username === 'admin';
        div.innerHTML = `
          <span class="chat-msg-username ${isSys ? 'System' : (isAdm ? 'admin' : '')}">${msg.username}:</span>
          <span class="chat-msg-text">${msg.message}</span>
        `;
        chatMessages.appendChild(div);
      });

      if (isScrolledToBottom) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }
  } catch (err) {
    console.error(err);
  }
}

window.openForumDetailModal = openForumDetailModal;

// ==========================================
// 8. AUTHENTICATION PAGES CONTROLLER (LOGIN/REGISTER)
// ==========================================
function initLoginPage() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const res = await window.safeFetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('gamezone_token', data.token);
        localStorage.setItem('gamezone_user', JSON.stringify(data.user));
        showToast(`Welcome back, ${data.user.username}!`, 'cyan');
        setTimeout(() => {
          if (data.user.role === 'admin') {
            window.location.href = 'admin.html';
          } else {
            window.location.href = 'dashboard.html';
          }
        }, 1200);
      } else {
        showToast(data.message || 'Login failed', 'pink');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection to auth server failed', 'pink');
    }
  });
}

function initRegisterPage() {
  const form = document.getElementById('register-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    try {
      const res = await window.safeFetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();
      if (res.ok) {
        showToast('Account registered successfully!', 'cyan');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
      } else {
        showToast(data.message || 'Registration failed', 'pink');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection to auth server failed', 'pink');
    }
  });
}

// ==========================================
// 9. USER DASHBOARD PAGE CONTROLLER
// ==========================================
async function initDashboardPage() {
  const token = localStorage.getItem('gamezone_token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const logoutBtn = document.getElementById('dashboard-logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);

  const tabs = document.querySelectorAll('.dash-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetSec = tab.getAttribute('data-dash-tab');
      document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
      document.getElementById(targetSec)?.classList.add('active');
    });
  });

  try {
    const res = await window.safeFetch(`${API_BASE}/api/dashboard/summary`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await res.json();
    if (res.ok) {
      const nameEl = document.getElementById('profile-name');
      const emailEl = document.getElementById('profile-email');
      const dateEl = document.getElementById('profile-date');
      const avatarEl = document.getElementById('avatar-char');
      const roleBadge = document.getElementById('profile-role-badge');

      if (nameEl) nameEl.textContent = data.user.username;
      if (emailEl) emailEl.textContent = data.user.email;
      if (dateEl) dateEl.textContent = new Date(data.user.createdAt).toLocaleDateString();
      if (avatarEl && data.user.username) avatarEl.textContent = data.user.username.substring(0, 1).toUpperCase();
      if (roleBadge) {
        roleBadge.innerHTML = `<span class="badge ${data.user.role === 'admin' ? 'badge-pink' : 'badge-cyan'}">${data.user.role}</span>`;
      }

      const tourList = document.getElementById('dash-tournaments-list');
      if (tourList) {
        tourList.innerHTML = '';
        if (data.tournaments.length === 0) {
          tourList.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--text-muted);">You are not registered in any upcoming matches.</div>`;
        } else {
          data.tournaments.forEach(t => {
            const item = document.createElement('div');
            item.className = 'dashboard-list-item';
            item.innerHTML = `
              <div>
                <h4>${t.title}</h4>
                <p style="font-size:0.9rem; color:var(--text-muted);">Game: ${t.game} | Date: ${t.date} at ${t.time}</p>
              </div>
              <span class="badge badge-cyan">${t.status}</span>
            `;
            tourList.appendChild(item);
          });
        }
      }

      const orderList = document.getElementById('dash-orders-list');
      if (orderList) {
        orderList.innerHTML = '';
        if (data.orders.length === 0) {
          orderList.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--text-muted);">No store orders found.</div>`;
        } else {
          data.orders.forEach(o => {
            const item = document.createElement('div');
            item.className = 'dashboard-list-item';
            
            let itemTitles = o.items.map(i => `${i.title} (x${i.quantity})`).join(', ');

            item.innerHTML = `
              <div>
                <h4>Order #${o._id.substring(o._id.length - 6).toUpperCase()}</h4>
                <p style="font-size:0.9rem; color:var(--text-muted);">Items: ${itemTitles}</p>
                <p style="font-size:0.85rem; color:var(--text-muted);">Placed on: ${new Date(o.createdAt).toLocaleDateString()}</p>
              </div>
              <div style="text-align:right;">
                <span class="game-price" style="display:block;margin-bottom:0.2rem;">$${o.totalAmount.toFixed(2)}</span>
                <span class="badge badge-green">${o.status}</span>
              </div>
            `;
            orderList.appendChild(item);
          });
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}

// ==========================================
// 10. ADMIN CONSOLE PAGE CONTROLLER
// ==========================================
async function initAdminPage() {
  const token = localStorage.getItem('gamezone_token');
  const userStr = localStorage.getItem('gamezone_user');

  if (!token || !userStr) {
    window.location.href = 'login.html';
    return;
  }

  const user = JSON.parse(userStr);
  if (user.role !== 'admin') {
    showToast('Unauthorized access', 'pink');
    setTimeout(() => window.location.href = 'dashboard.html', 1000);
    return;
  }

  loadAdminStats();

  const addGameBtn = document.getElementById('add-game-toggle-btn');
  const gameForm = document.getElementById('admin-game-form');
  const cancelGameForm = document.getElementById('cancel-game-form-btn');
  const addTourBtn = document.getElementById('add-tour-toggle-btn');
  const tourForm = document.getElementById('admin-tour-form');
  const cancelTourForm = document.getElementById('cancel-tour-form-btn');

  if (addGameBtn && gameForm) {
    addGameBtn.addEventListener('click', () => {
      gameForm.style.display = gameForm.style.display === 'none' ? 'block' : 'none';
      gameForm.reset();
      document.getElementById('admin-game-id').value = '';
      document.getElementById('submit-game-btn').textContent = 'Save Game';
    });
  }
  if (cancelGameForm && gameForm) {
    cancelGameForm.addEventListener('click', () => gameForm.style.display = 'none');
  }

  if (addTourBtn && tourForm) {
    addTourBtn.addEventListener('click', () => {
      tourForm.style.display = tourForm.style.display === 'none' ? 'block' : 'none';
      tourForm.reset();
      document.getElementById('admin-tour-id').value = '';
      document.getElementById('submit-tour-btn').textContent = 'Save Tournament';
    });
  }
  if (cancelTourForm && tourForm) {
    cancelTourForm.addEventListener('click', () => tourForm.style.display = 'none');
  }

  if (gameForm) {
    gameForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('admin-game-id').value;
      const title = document.getElementById('admin-game-title').value;
      const category = document.getElementById('admin-game-category').value;
      const description = document.getElementById('admin-game-desc').value;
      const platform = document.getElementById('admin-game-platform').value || 'PC';
      const price = Number(document.getElementById('admin-game-price').value) || 0;
      const rating = Number(document.getElementById('admin-game-rating').value) || 4.5;
      const image = document.getElementById('admin-game-image').value;

      const body = { title, category, description, platform, price, rating, image };
      
      let method = 'POST';
      let url = `${API_BASE}/api/games`;
      if (id) {
        method = 'PUT';
        url = `${API_BASE}/api/games/${id}`;
      }

      try {
        const res = await window.safeFetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          },
          body: JSON.stringify(body)
        });

        if (res.ok) {
          showToast(id ? 'Game updated' : 'Game created', 'cyan');
          gameForm.style.display = 'none';
          gameForm.reset();
          loadAdminStats();
        } else {
          const data = await res.json();
          showToast(data.message || 'Action failed', 'pink');
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  if (tourForm) {
    tourForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('admin-tour-id').value;
      const title = document.getElementById('admin-tour-title').value;
      const game = document.getElementById('admin-tour-game').value;
      const date = document.getElementById('admin-tour-date').value;
      const time = document.getElementById('admin-tour-time').value;
      const prizePool = document.getElementById('admin-tour-prizepool').value;
      const slots = Number(document.getElementById('admin-tour-slots').value) || 16;

      const body = { title, game, date, time, prizePool, slots };
      
      let method = 'POST';
      let url = `${API_BASE}/api/tournaments`;
      if (id) {
        method = 'PUT';
        url = `${API_BASE}/api/tournaments/${id}`;
      }

      try {
        const res = await window.safeFetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          },
          body: JSON.stringify(body)
        });

        if (res.ok) {
          showToast(id ? 'Tournament updated' : 'Tournament created', 'cyan');
          tourForm.style.display = 'none';
          tourForm.reset();
          loadAdminStats();
        } else {
          const data = await res.json();
          showToast(data.message || 'Action failed', 'pink');
        }
      } catch (err) {
        console.error(err);
      }
    });
  }
}

async function loadAdminStats() {
  const usersCountEl = document.getElementById('admin-users-count');
  const gamesCountEl = document.getElementById('admin-games-count');
  const toursCountEl = document.getElementById('admin-tournaments-count');
  const ordersCountEl = document.getElementById('admin-orders-count');
  const revenueCountEl = document.getElementById('admin-revenue-count');
  const gamesTbody = document.getElementById('admin-games-tbody');
  const toursTbody = document.getElementById('admin-tours-tbody');

  try {
    const res = await window.safeFetch(`${API_BASE}/api/admin/stats`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await res.json();
    if (res.ok) {
      if (usersCountEl) usersCountEl.textContent = data.metrics.totalUsers;
      if (gamesCountEl) gamesCountEl.textContent = data.metrics.totalGames;
      if (toursCountEl) toursCountEl.textContent = data.metrics.totalTournaments;
      if (ordersCountEl) ordersCountEl.textContent = data.metrics.totalOrders;
      if (revenueCountEl) revenueCountEl.textContent = `$${data.metrics.totalRevenue.toFixed(2)}`;

      if (gamesTbody) {
        gamesTbody.innerHTML = '';
        data.games.forEach(g => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><img src="${g.image}" style="width:50px;height:35px;object-fit:cover;border-radius:2px;border:var(--glass-border);"></td>
            <td><b>${g.title}</b></td>
            <td>${g.category}</td>
            <td>${g.platform}</td>
            <td>${g.price === 0 ? 'FREE' : `$${g.price.toFixed(2)}`}</td>
            <td>⭐ ${g.rating || 0}</td>
            <td class="admin-actions">
              <button class="admin-action-btn edit" onclick="editGameItem('${g._id}')">✏️</button>
              <button class="admin-action-btn delete" onclick="deleteGameItem('${g._id}')">🗑️</button>
            </td>
          `;
          gamesTbody.appendChild(tr);
        });
      }

      if (toursTbody) {
        toursTbody.innerHTML = '';
        data.tournaments.forEach(t => {
          const taken = t.registeredTeams ? t.registeredTeams.length : 0;
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><b>${t.title}</b></td>
            <td>${t.game}</td>
            <td>${t.date} &bull; ${t.time}</td>
            <td><b style="color:var(--neon-pink);">${t.prizePool}</b></td>
            <td>${taken} / ${t.slots}</td>
            <td><span class="badge ${t.status === 'upcoming' ? 'badge-cyan' : 'badge-pink'}">${t.status}</span></td>
            <td class="admin-actions">
              <button class="admin-action-btn edit" onclick="editTourItem('${t._id}')">✏️</button>
              <button class="admin-action-btn delete" onclick="deleteTourItem('${t._id}')">🗑️</button>
            </td>
          `;
          toursTbody.appendChild(tr);
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
}

window.editGameItem = async function(id) {
  try {
    const res = await window.safeFetch(`${API_BASE}/api/games`);
    const games = await res.json();
    const game = games.find(g => g._id === id);

    if (game) {
      document.getElementById('admin-game-id').value = game._id;
      document.getElementById('admin-game-title').value = game.title;
      document.getElementById('admin-game-category').value = game.category;
      document.getElementById('admin-game-desc').value = game.description;
      document.getElementById('admin-game-platform').value = game.platform || 'PC';
      document.getElementById('admin-game-price').value = game.price || 0;
      document.getElementById('admin-game-rating').value = game.rating || 4.5;
      document.getElementById('admin-game-image').value = game.image;

      document.getElementById('submit-game-btn').textContent = 'Update Game';
      document.getElementById('admin-game-form').style.display = 'block';
      window.scrollTo(0, 200);
    }
  } catch (err) {
    console.error(err);
  }
};

window.deleteGameItem = async function(id) {
  if (!confirm('Are you sure you want to delete this game?')) return;

  try {
    const res = await window.safeFetch(`${API_BASE}/api/games/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (res.ok) {
      showToast('Game deleted successfully', 'cyan');
      loadAdminStats();
    } else {
      const data = await res.json();
      showToast(data.message || 'Delete failed', 'pink');
    }
  } catch (err) {
    console.error(err);
  }
};

window.editTourItem = async function(id) {
  try {
    const res = await window.safeFetch(`${API_BASE}/api/tournaments`);
    const tours = await res.json();
    const tour = tours.find(t => t._id === id);

    if (tour) {
      document.getElementById('admin-tour-id').value = tour._id;
      document.getElementById('admin-tour-title').value = tour.title;
      document.getElementById('admin-tour-game').value = tour.game;
      document.getElementById('admin-tour-date').value = tour.date;
      document.getElementById('admin-tour-time').value = tour.time;
      document.getElementById('admin-tour-prizepool').value = tour.prizePool;
      document.getElementById('admin-tour-slots').value = tour.slots;

      document.getElementById('submit-tour-btn').textContent = 'Update Tournament';
      document.getElementById('admin-tour-form').style.display = 'block';
      window.scrollTo(0, 500);
    }
  } catch (err) {
    console.error(err);
  }
};

window.deleteTourItem = async function(id) {
  if (!confirm('Are you sure you want to delete this tournament?')) return;

  try {
    const res = await window.safeFetch(`${API_BASE}/api/tournaments/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (res.ok) {
      showToast('Tournament deleted successfully', 'cyan');
      loadAdminStats();
    } else {
      const data = await res.json();
      showToast(data.message || 'Delete failed', 'pink');
    }
  } catch (err) {
    console.error(err);
  }
};
