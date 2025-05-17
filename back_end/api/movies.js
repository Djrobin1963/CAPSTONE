const express = require("express");
const router = express.Router();
const client = require("../db/client");
require("dotenv").config();

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// GET /api/movies
router.get("/", async (req, res, next) => {
  try {
    const { rows } = await client.query(
      /*SQL*/
      `
      SELECT m.*, 
        ROUND(AVG(r.rating), 1) AS avg_rating
      FROM movies m
      LEFT JOIN reviews r ON r.movie_id = m.id
      GROUP BY m.id
      ORDER BY m.release_year DESC
    `
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// GET /api/movies/:id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Try to find movie in local database
    const { rows: movieRows } = await client.query(
      /*SQL*/
      `
      SELECT * FROM movies WHERE id = $1
    `,
      [id]
    );

    const { rows: reviews } = await client.query(
      /*SQL*/
      `
      SELECT r.*, u.username FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.movie_id = $1
    `,
      [id]
    );

    if (movieRows.length > 0) {
      res.json({
        ...movieRows[0],
        reviews,
      });
    } else {
      // Fallback: Fetch movie from TMDB API
      const response = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      if (!response.ok) throw new Error("Movie not found in TMDB");

      const tmdbMovie = await response.json();

      res.json({
        id: tmdbMovie.id,
        title: tmdbMovie.title,
        description: tmdbMovie.overview,
        poster_url: tmdbMovie.poster_path
          ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`
          : null,
        release_year: tmdbMovie.release_date
          ? tmdbMovie.release_date.slice(0, 4)
          : null,
        reviews: [], // no reviews yet
      });
    }
  } catch (err) {
    console.error("Movie Details Fetch Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
