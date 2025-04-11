const express = require("express");
const router = express.Router();
const client = require("../db/client");
const bcrypt = require("bcrypt");
const { generateToken } = require("../auth/utils");

// Register
router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const { rows } = await client.query(
      /*SQL*/
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, username`,
      [username, email, hashed]
    );

    const token = generateToken(rows[0]);
    res.json({ user: rows[0], token });
  } catch (err) {
    next(err);
  }
});

// Login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { rows } = await client.query(
      /*SQL*/
      `SELECT id, username, email, password FROM users WHERE email = $1`,
      [email]
    );

    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    delete user.password;
    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
