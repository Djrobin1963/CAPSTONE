const express = require("express");
const router = express.Router();
const client = require("../db/client");
const { requireUser } = require("../auth/middleware");

// GET /api/users/me
router.get("/me", requireUser, async (req, res, next) => {
  try {
    const { rows } = await client.query(
      /*SQL*/
      `
      SELECT id, username, email FROM users WHERE id = $1
    `,
      [req.user.id]
    );

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/me/reviews
router.get("/me/reviews", requireUser, async (req, res, next) => {
  try {
    const { rows } = await client.query(
      /*SQL*/
      `
      SELECT * FROM reviews WHERE user_id = $1
    `,
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
