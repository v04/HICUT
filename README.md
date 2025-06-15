# HICUT Backend - README.md

## 📌 Project Overview
HICUT is a ride-sharing + reward-based platform for hitchhikers (riders) and pilots (drivers). Instead of cash, users earn **reward tokens** (Food, Travel, Clothing, etc.) for completing meaningful rides.

This is the **Node.js + Express** backend repository handling:
- User authentication (JWT)
- Ride creation/join logic
- Reward progress tracking
- Geolocation-based validation
- Anti-cheating measures

---

## 📁 Project Structure
```
backend/
├── controllers/        # Business logic
│   ├── authController.js
│   ├── rideController.js
│   └── rewardController.js
│
├── models/             # Mongoose/Postgres models
│   ├── User.js
│   ├── Ride.js
│   ├── Reward.js
│   └── Location.js
│
├── routes/             # API routes
│   ├── authRoutes.js
│   ├── rideRoutes.js
│   └── rewardRoutes.js
│
├── middleware/         # JWT & role-checks
│   ├── auth.js
│   └── validateRide.js
│
├── utils/              # Helper functions
│   └── geoUtils.js
│
├── .env                # Environment variables
├── server.js           # App entry point
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/hicut-backend.git
cd hicut-backend
npm install
```

### 2. Setup `.env`
Create a `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/hicut
JWT_SECRET=supersecretkey123
```

### 3. Run Locally
```bash
npm run dev
```

---

## 🧪 Core API Endpoints

### 📍 Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/register` | Register new Rider/Pilot |
| POST   | `/login`    | Login and receive JWT |
| GET    | `/me`       | Fetch current user info |

### 🚗 Ride Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/rides/create` | Pilot creates a ride |
| POST   | `/rides/join`   | Rider joins ride by rideId |
| GET    | `/rides/nearby` | Rider discovers nearby pilots (geolocation) |

### 🎁 Reward Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/rewards/status` | Get reward progress per user |
| GET    | `/rewards/all`    | Get available reward types |

---

## ✅ To-Do (for Devs)
- [ ] Complete `rideController.js` ride distance logic
- [ ] Add anti-cheating check in `validateRide.js`
- [ ] Implement `/rides/nearby` using Haversine formula
- [ ] Connect reward logic in `rewardController.js`

---

## 🧠 Notes
- All user actions require JWT header: `Authorization: Bearer <token>`
- Use Postman or Thunder Client to test routes
- Frontend uses `/rewards/status` to show progress bar

---

## 📬 Contact / Issues


---

