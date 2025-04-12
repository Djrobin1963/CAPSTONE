const express = require("express");
const router = express.Router();
const client = require("../db/client");
const { requireUser } = require("../auth/middleware");
const { v4: uuidv4 } = require("uuid");

// GET /api/comments
router.get("/", async (req, res, next) => {
  try {
    const { rows } = await client.query(
      /*SQL*/
      `
      SELECT c.*, u.username, r.text AS review_text
      FROM comments c
      JOIN users u ON c.user_id = u.id
      JOIN reviews r ON c.review_id = r.id
      ORDER BY c.created_at DESC
    `
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// POST /api/comments
router.post("/", requireUser, async (req, res, next) => {
  const { review_id, text } = req.body;

  const { rows } = await client.query(
    /*SQL*/
    `
    INSERT INTO comments (id, user_id, review_id, text)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [uuidv4(), req.user.id, review_id, text]
  );

  res.status(201).json(rows[0]);
});

// PATCH /api/comments/:id
router.patch("/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;

  const { rows } = await client.query(
    /*SQL*/
    `
    UPDATE comments SET text = $1
    WHERE id = $2 AND user_id = $3
    RETURNING *
    `,
    [text, id, req.user.id]
  );

  res.json(rows[0]);
});

// DELETE /api/comments/:id
router.delete("/:id", requireUser, async (req, res, next) => {
  await client.query(
    /*SQL*/
    `DELETE FROM comments WHERE id = $1 AND user_id = $2`,
    [req.params.id, req.user.id]
  );
  res.sendStatus(204);
});

module.exports = router;
