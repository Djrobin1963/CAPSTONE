require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const client = require("./db/client");
const { createTables } = require("./db/seed");
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(morgan("dev"));

const init = async () => {
  try {
    console.log("Connected to the database");
    await client.connect();
    console.log("Connected to database");

    console.log("🧹 Creating tables...");
    await createTables();
    console.log("Tables created");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

init();
