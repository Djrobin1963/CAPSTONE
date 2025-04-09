require("dotenv").config();
const { Client } = require("pg");

// Configure the PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL || 3000,
});

// Connect to the database
client
  .connect()
  .then(() => console.log("Connected to the database successfully"))
  .catch((err) => console.error("Database connection error:", err.stack));

// Export client
module.exports = client;
