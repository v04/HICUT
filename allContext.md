**HICUT Development Manual: Unified Prompt for AI-Based Team Alignment**

---

**Purpose:**
This document is designed to act as a prompt or base manual to be fed into an LLM (like ChatGPT or GitHub Copilot) for helping front-end, back-end, and full-stack developers working independently on the HICUT project. It ensures that all developers are aligned with the vision, flow, API integration, and shared responsibilities.

---

**PROJECT NAME:** HICUT - A Social Hitchhiking and Reward-Based Ride Sharing Platform

**CORE VISION:**
To build a mobile-first (and optionally web-responsive) app where hitchhikers (riders) and car drivers (pilots) can coordinate rides. Instead of monetary transactions, riders and pilots earn branded rewards after completing unique rides. The platform encourages exploration, community-building, and brand involvement.

---

## ROADMAP

### Phase 1: Core MVP Prototype (Focus: Core Functional Model)

* **Target:** Build a functional ride-sharing & reward system with registration.

**Includes:**

1. Front-End UI for Rider & Pilot
2. Back-End APIs for User/Auth/Rewards/Trips
3. Authentication + Session Handling
4. Maps Integration for route visibility and ride matching
5. Reward Logic (Dummy Data or Brand Simulation)
6. Admin Panel (simple view for ride tracking and abuse prevention)

---

### Phase 2: Scale & Partner Demo

* Add more brands
* Add advanced location-based features
* Add mobile push notifications
* Improve UI/UX polish

---

## SHARED LOGIC OVERVIEW FOR ALL DEVELOPERS

> **IMPORTANT:** All parts of the application must work with a common set of APIs, data models, and endpoint specs. Developers must use the same auth structure and base models for `User`, `Ride`, `Reward`, and `Location`.

---

## FRONT-END MODULE (MOBILE-FIRST/UI)

### Stack Recommendation:

* React Native (Expo) or Flutter
* Tailwind (if web fallback used)

### Pages & Components:

* **Welcome / Onboarding Page** (Select role: Rider or Pilot)
* **Registration/Login Page** (via API `/register`, `/login`)
* **Home Page** (Map, current location, find/join rides)
* **Ride Matching Page** (Uses `/rides/find`, `/rides/create`)
* **Rewards Page** (List rewards earned, progress)
* **Profile Page** (User details, logout)

### Frontend-Backend Sync

* Every button/form must align with a defined endpoint.
* All session handling uses JWT (stored securely).
* Ride matching should poll `/rides/match` API.
* Frontend must reflect reward eligibility based on `/rewards/status`.

---

## BACK-END MODULE (API + DB + LOGIC)

### Stack Recommendation:

* Node.js + Express
* MongoDB or PostgreSQL
* JWT for authentication

### Core API Routes:

* `POST /register` → creates Rider/Pilot
* `POST /login` → returns JWT
* `GET /me` → fetch logged-in user details
* `POST /rides/create` → pilot creates ride
* `POST /rides/join` → rider joins ride
* `GET /rewards/status` → returns reward progress
* `GET /admin/rides` → admin dashboard for monitoring

### Database Models:

* **User**: { id, name, role, rewardProgress, rideHistory }
* **Ride**: { id, pilotId, riderId, start, end, timestamp }
* **Reward**: { id, name, requirement, status }
* **Location**: { lat, long, city }

---

## MAPS INTEGRATION

* Use Google Maps API or Mapbox
* Front-end uses Maps to:

  * Get current location (via GPS)
  * Select destination
  * Show ride routes
* Backend stores and verifies route distance, to validate rides

---

## AUTH + SECURITY

* JWT tokens for login (shared across mobile/web)
* Role-based access (`rider`, `pilot`, `admin`)
* Geofencing logic for preventing fake rides (back-end logic)

---

## REWARD SYSTEM

* Back-end tracks unique rides (no repeated rider-pilot pairs)
* Front-end fetches reward progress from `/rewards/status`
* Pilot & Rider both get reward after ride validation
* Admin approval optional (manual verification)

---

## LLM PROMPT FOR INDIVIDUAL DEVELOPERS

> If you are using this document in an AI model (like ChatGPT), begin with this:

```prompt
You are part of the development team for a ride-sharing and reward-based mobile-first application called HICUT. The platform connects riders (hitchhikers) and pilots (drivers), allowing them to match for short/long distance travel. Instead of money, users earn rewards (meals, gear, etc.) after completing unique rides.

You are working on the [FRONT-END / BACK-END / MAP / AUTHENTICATION] module. You must ensure that your implementation aligns with shared APIs and database schemas.

Use the following endpoints and models:
- POST /register
- POST /login
- GET /me
- POST /rides/create
- POST /rides/join
- GET /rewards/status

You must ensure your implementation supports secure JWT authentication, interacts cleanly with other modules, and follows the defined reward logic.

Ask me any questions for deeper detail on your module.
```

---


