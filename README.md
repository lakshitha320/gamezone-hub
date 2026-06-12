# 🎮 GameZone Hub

A modern full-stack gaming platform designed for gamers, esports communities, and tournament organizers. GameZone Hub provides game discovery, tournament management, community interaction, merchandise purchasing, and real-time engagement features through a visually immersive cyberpunk-inspired interface.

## 🌐 Live Demo

**Website:** https://gamezone-hub-lovat.vercel.app/

---

## 📖 Overview

GameZone Hub is a comprehensive gaming ecosystem that combines competitive gaming tools, community features, and e-commerce capabilities into a single platform. The application offers an engaging user experience with a futuristic gaming-themed design while maintaining scalability through flexible database integration.

Whether users want to discover new games, participate in tournaments, engage with gaming communities, or purchase gaming merchandise, GameZone Hub provides a seamless experience.

---

## ✨ Features

### 🎮 Game Explorer

* Browse and discover popular games
* Search and filter by category
* View ratings and community feedback
* Submit game ratings and reviews

### 🏆 Tournament Management

* View active tournaments and schedules
* Register for tournament brackets
* Monitor slot availability
* Track tournament participation

### 🛒 Merchandise Store

* Browse gaming merchandise
* Add products to cart
* Manage quantities dynamically
* Complete checkout process
* Track order history

### 💬 Community Platform

* Discussion forums
* Thread creation and replies
* Live gaming chat rooms
* Community-driven interactions

### 🤖 AI Support Assistant

* Interactive chatbot widget
* Instant user assistance
* Tournament information support
* Store and game-related guidance

### 📊 Dashboard & Administration

* User dashboard
* Order tracking
* Activity monitoring
* Administrative analytics and management tools

### 🔐 Authentication & Security

* User registration and login
* JWT-based authentication
* Protected routes
* Role-based access controls

---

## 🎨 User Interface

GameZone Hub features a custom-designed gaming experience including:

* Dark Cyberpunk Theme
* Neon Accent Color System
* Glassmorphism Components
* Responsive Design
* Animated UI Elements
* Mobile-Friendly Navigation
* Interactive Dashboard Layouts

---

## 🏗️ System Architecture

### Frontend

* HTML5
* CSS3
* JavaScript (ES6+)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Production)
* In-Memory Database Fallback (Development)

### Authentication

* JSON Web Tokens (JWT)

### Deployment

* Vercel

---

## 📁 Project Structure

```text
gamezone-hub/
├── public/
│   ├── css/
│   ├── js/
│   └── index.html
│
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   └── routes/
│
├── package.json
├── server.js
├── README.md
└── .env.example
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/lakshitha320/gamezone-hub.git
cd gamezone-hub
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_secret_key
MONGODB_URI=your_mongodb_connection_string
```

> If `MONGODB_URI` is not provided, the application automatically switches to the built-in in-memory database.

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

Application URL:

```text
http://localhost:5000
```

---

## 🔑 Demo Credentials

### Administrator

```text
Username: admin
Password: admin123
```

### Standard User

```text
Username: gamer1
Password: user123
```

---

## 🚀 Deployment

The application is deployed using Vercel for fast and scalable hosting.

To deploy your own version:

```bash
vercel
```

Or connect your GitHub repository directly through the Vercel Dashboard.

---

## 📸 Screenshots

Add screenshots of:

* Homepage
* Game Explorer
* Tournament Page
* Store
* Community Forums
* Admin Dashboard

---

## 🔮 Future Enhancements

* Real-time multiplayer integration
* Matchmaking system
* Payment gateway integration
* Achievement and ranking system
* User profile customization
* Push notifications
* Mobile application support

---

## 👨‍💻 Author

**Lakshitha Chanaka**

* LinkedIn:www.linkedin.com/in/chanaka-sadaruwan-b0b745320
* GitHub: https://github.com/lakshitha320/gamezone-hub.git

---

## 📄 License

This project is licensed under the MIT License.

---

### Built for Gamers. Designed for Competition. 🎮🔥
