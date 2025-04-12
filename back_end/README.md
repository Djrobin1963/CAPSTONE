# 🛠️ Movie Review Backend – Project Plan

This document outlines the full development plan for the backend of the Movie Review App, broken into phases, tasks, and dependencies.

---

## ✅ Phase 1: Project Setup

**Objective:** Initialize Node project and set up base Express server.

- [ ] Create GitHub repo: `movie-review-backend`
- [ ] `npm init` and install: `express`, `pg`, `dotenv`, `cors`, `uuid`, `bcrypt`, `jsonwebtoken`
- [ ] Create `index.js`, connect to PostgreSQL
- [ ] Setup folder structure: `db/`, `api/`, `auth/`
- [ ] Enable CORS middleware
- [ ] Add `client.js` for DB connection

---

## 🔐 Phase 2: Authentication (JWT)

**Objective:** Handle secure registration, login, and route protection.

- [ ] Create `auth/utils.js` for `generateToken()`, `verifyToken()`
- [ ] Create `auth/middleware.js` for `requireUser`
- [ ] `POST /api/auth/register` & `POST /api/auth/login`
- [ ] Hash passwords with bcrypt
- [ ] Send JWTs to clients

---

## 🧱 Phase 3: Database & Seeding

**Objective:** Build schema and populate with fake data.

- [ ] `resetTables.js` to create/drop tables
- [ ] `seedUsers.js`, `seedMovies.js`, `seedReviews.js`, `seedComments.js`
- [ ] Use `faker` and `uuid` for realistic data
- [ ] `seed.js` master seeder to connect and populate

---

## 🔌 Phase 4: API Routing

**Objective:** Modularize routing per feature.

- [ ] Create `api/auth.js`, `users.js`, `movies.js`, `reviews.js`, `comments.js`
- [ ] Mount all routes in `index.js`
- [ ] Use `requireUser` on protected endpoints

---

## 👤 Phase 5: User Routes

**Objective:** Provide user data and review history.

- [ ] `GET /api/users/me`
- [ ] `GET /api/users/me/reviews`
- [ ] `GET /api/users/me/comments`

---

## 🎬 Phase 6: Movie Routes

**Objective:** Movie list and detail functionality.

- [ ] `GET /api/movies`
- [ ] `GET /api/movies/:id`
- [ ] Optional: `GET /api/movies?q=search`

---

## ✍️ Phase 7: Review Routes

**Objective:** CRUD for user reviews.

- [ ] `POST /api/reviews`
- [ ] `PATCH /api/reviews/:id`
- [ ] `DELETE /api/reviews/:id`

---

## 💬 Phase 8: Comment Routes

**Objective:** Add and manage comments on reviews.

- [ ] `POST /api/comments`
- [ ] `PATCH /api/comments/:id`
- [ ] `DELETE /api/comments/:id`

---

## 🛡️ Phase 9: Security & Error Handling

**Objective:** Protect routes and improve developer feedback.

- [ ] Central error middleware
- [ ] Authorization guards for sensitive actions
- [ ] Input sanitization

---

## 🧪 Phase 10: Testing

**Objective:** Ensure routes behave as expected.

- [ ] Manual testing in Postman
- [ ] Validate error codes and messages
- [ ] Seed and query test data

---

## 🚀 Phase 11: Deployment Prep

**Objective:** Get app ready for public release.

- [ ] Final environment variable support
- [ ] Final schema cleanup
- [ ] Add `README.md` with API docs
- [ ] Deploy on Render or Railway
