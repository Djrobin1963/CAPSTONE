const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

// Create a JWT token
function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

// Verify JWT token
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  generateToken,
  verifyToken,
};
