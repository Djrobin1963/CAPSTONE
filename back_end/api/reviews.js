const express = require("express");
const router = express.Router();
const client = require("../db/client");
const { requireUser } = require("../auth/middleware");
const { v4: uuidv4 } = require("uuid");

// POST /api/reviews
router.post("/", requireUser, async (req, res, next) => {
  const { movie_id, rating, text } = req.body;

  try {
    const { rows } = await client.query(
      /*SQL*/
      `
      INSERT INTO reviews (id, user_id, movie_id, rating, text)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [uuidv4(), req.user.id, movie_id, rating, text]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/reviews/:id
router.patch("/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { rating, text } = req.body;

  try {
    const { rows } = await client.query(
      /*SQL*/
      `
      UPDATE reviews
      SET rating = $1, text = $2
      WHERE id = $3 AND user_id = $4
      RETURNING *
    `,
      [rating, text, id, req.user.id]
    );

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/reviews/:id
router.delete("/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;

  await client.query(
    /*SQL*/
    `DELETE FROM reviews WHERE id = $1 AND user_id = $2`,
    [id, req.user.id]
  );
  res.sendStatus(204);
});

module.exports = router;
