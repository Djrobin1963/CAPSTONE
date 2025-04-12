const express = require("express");
const router = express.Router();
const client = require("../db/client");

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

    res.json({
      ...movieRows[0],
      reviews,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
