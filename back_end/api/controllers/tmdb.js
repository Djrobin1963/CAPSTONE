const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Helper to call TMDB with category
const fetchTMDB = (endpoint) => async (req, res) => {
  try {
    const totalPages = 5; // or however many you want
    let allMovies = [];
    const seenIds = new Set(); // track movie IDs we've already seen

    for (let page = 1; page <= totalPages; page++) {
      const response = await fetch(
        `${BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
      );

      if (!response.ok) {
        const message = await response.text();
        console.error(`❌ TMDB error [${endpoint} page ${page}]:`, message);
        return res.status(502).json({ error: "Failed to fetch TMDB data" });
      }

      const data = await response.json();
      if (data.results) {
        for (const movie of data.results) {
          if (!seenIds.has(movie.id)) {
            allMovies.push(movie);
            seenIds.add(movie.id); // mark this ID as seen
          }
        }
      }
    }

    res.json(allMovies);
  } catch (err) {
    console.error(`❌ TMDB fetch failed [${endpoint}]:`, err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// TMDB Category Routes
router.get("/popular", fetchTMDB("/movie/popular"));
router.get("/top_rated", fetchTMDB("/movie/top_rated"));
router.get("/upcoming", fetchTMDB("/movie/upcoming"));
router.get("/now_playing", fetchTMDB("/movie/now_playing"));

module.exports = { router };
