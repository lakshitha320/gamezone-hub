# GameZone Hub 🎮

GameZone Hub is a comprehensive gaming platform built for competitive gamers and enthusiasts. It offers dynamic pages for exploring top titles, tournament bracket bookings, esports team profile databases, shopping carts for merchandise, global chat rooms, discussion boards, dashboards, and admin panels.

Featuring a beautiful **Dark Cyberpunk UI** with neon accents, custom animations, glassmorphism, responsive navigation drawer, and an AI chat helper.

---

## 🚀 Key Features

- **Dark Gaming UI**: Custom CSS theme pre-seeded with neon custom variables, glassmorphic layout templates, and keyframe hover animations.
- **Dynamic Catalog Explorer**: Search and filter games by categories. Submit ratings directly, which updates the overall ratings index.
- **Tournament Booking**: View schedules, slot capacities, active brackets, and book slots dynamically.
- **Merchandise Shopping Cart**: Drawer cart sliding from the right, badging counts, quantity adjusters, checkout flow, and dashboard order logger.
- **Forums & Chat Boards**: Real-time comment reply threads, topic publications, and live lobby chatroom with automated active responses.
- **Smart Chatbot Helper**: Floating support widget capable of resolving questions on game directories, merch availability, active brackets, and support.
- **Dual Database Core**: Automatically hooks up to MongoDB if `MONGODB_URI` is present in configuration. Otherwise, it transparently falls back to an **In-Memory database pre-seeded with mockup data**. Users can test registration, chat posting, admin addition, or order checkouts completely in memory.

---

## 🛠️ Project Structure

```
gamezone-hub/
├── package.json          # Node dependencies and scripts
├── server.js             # Main server entrypoint
├── .env.example          # Sample environment variables
├── README.md             # Project documentation
├── public/               # Frontend Client Files
│   ├── index.html        # Home view
│   │   ... (other HTML pages)
│   ├── css/
│   │   └── style.css     # CSS variable design system & animations
│   └── js/
│       ├── script.js     # Global navbar auth, cart drawer, and chatbot
│       └── pages.js      # Dynamic page-specific API loaders
└── server/               # Backend Server logic
    ├── config/
    │   └── db.js         # Database configuration & fallback flags
    ├── middleware/
    │   └── auth.js       # JWT authentication middleware
    ├── models/
    │   └── dbWrapper.js  # Schema compilers & In-memory mockup seed database
    └── routes/
        ├── auth.js       # Register, Login, Profile checks
        ├── games.js      # Games explorer catalog CRUD & ratings
        ├── tournaments.js# Tournament schedules, registries & slots
        ├── store.js      # Merch items and order checkout actions
        ├── community.js  # Forum creation, thread replies, chat rooms
        ├── admin.js      # Administration dashboards metrics aggregations
        └── dashboard.js  # User registrations and purchase logs
```

---

## 💻 Local Setup & Execution

### 1. Prerequisites
Ensure you have **Node.js** installed on your system.

### 2. Install Dependencies
Navigate to the project directory and run:
```bash
npm install
```

### 3. Setup Environment Variables (Optional)
Copy `.env.example` to `.env` and fill in your connection credentials:
```bash
cp .env.example .env
```
*Note: If no `.env` file exists or `MONGODB_URI` is not filled out, the server runs in fallback memory database mode.*

### 4. Start Server
Run the dev server using nodemon (auto-reloads on edits):
```bash
npm run dev
```
Alternatively, start the server normally:
```bash
npm start
```
Open **[http://localhost:5000](http://localhost:5000)** in your web browser.

---

## 🔑 Pre-seeded Testing Accounts

Use these credentials to test user profiles and admin functionalities out of the box (valid in memory database fallback):

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`

### Standard Gamer Account
- **Username**: `gamer1`
- **Password**: `user123`
