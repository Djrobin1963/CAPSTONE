const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Helper to call TMDB with category
const fetchTMDB = (endpoint) => async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      const message = await response.text();
      console.error(`❌ TMDB error [${endpoint}]:`, message);
      return res.status(502).json({ error: "Failed to fetch TMDB data" });
    }

    const data = await response.json();
    res.json(data.results); // send only the movie array
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
