# 🎬 Movie Review Frontend – Project Plan

This document outlines the full frontend development roadmap for the Movie Review App using React + Vite.

---

## ✅ Phase 1: Project Initialization

**Objective:** Set up React project using Vite, environment config, and routing.

- [ ] Create Vite app in `front_end/`
- [ ] Install dependencies: `react-router-dom`, `dotenv`
- [ ] Create `.env` file with `VITE_API_URL`
- [ ] Set up `App.jsx`, `main.jsx` with `<BrowserRouter>`
- [ ] Create folder structure:
  - `/pages`, `/components`, `/context`, `/api`

---

## 🏠 Phase 2: Home Page – Movie List

**Objective:** Fetch and display list of movies from backend.

- [ ] Create `Home.jsx`
- [ ] Fetch movies from `/api/movies`
- [ ] Create `MovieCard.jsx` to render each movie
- [ ] Display grid of movies with title, poster, rating, year
- [ ] Style with CSS or Tailwind

---

## 🎬 Phase 3: Movie Details Page

**Objective:** Show individual movie info with reviews.

- [ ] Create `MovieDetails.jsx`
- [ ] Fetch `/api/movies/:id`
- [ ] Display title, poster, description, avg rating
- [ ] List all reviews
- [ ] Add link back to home

---

## 🔐 Phase 4: Authentication

**Objective:** Implement JWT login and registration.

- [ ] Create `Login.jsx`, `Register.jsx`
- [ ] Use forms to collect input
- [ ] Send to `/api/auth/login` and `/register`
- [ ] Save token + user in localStorage/context
- [ ] Create `AuthContext.jsx` and wrap app

---

## ✍️ Phase 5: Review System

**Objective:** Allow users to submit and manage reviews.

- [ ] Create `WriteReview.jsx`
- [ ] Allow rating (1–10) + text
- [ ] POST to `/api/reviews`
- [ ] Allow edit/delete of user’s reviews
- [ ] Show “Your Review” in `MovieDetails`

---

## 💬 Phase 6: Comments on Reviews

**Objective:** Enable users to comment on reviews.

- [ ] Add comment box below each review
- [ ] POST to `/api/comments`
- [ ] Allow user to edit/delete their comments
- [ ] Create `CommentBox.jsx`

---

## 👤 Phase 7: My Account Dashboard

**Objective:** Show user profile, reviews, and comments.

- [ ] Create `MyAccount.jsx`
- [ ] Fetch data from `/api/users/me`, `/me/reviews`, `/me/comments`
- [ ] List items with edit/delete options
- [ ] Add logout button

---

## 🔍 Phase 8: Search & Filter

**Objective:** Enable movie searching and filtering.

- [ ] Add search input in `Header.jsx`
- [ ] Implement filter logic in `Home.jsx`
- [ ] Optional: update backend with `/movies?q=`

---

## 🎨 Phase 9: Styling & UI Polish

**Objective:** Finalize layout and user experience.

- [ ] Apply responsive CSS
- [ ] Style all forms and cards
- [ ] Use brand colors and fonts
- [ ] Test mobile layout

---

## ✅ Phase 10: Final QA & Launch Prep

**Objective:** Review app and prepare for deployment.

- [ ] Test all routes manually
- [ ] Fix layout issues
- [ ] Clean up code and unused files
- [ ] Deploy to Netlify or Vercel
