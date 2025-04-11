require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const client = require("./db/client");
const { createTables } = require("./db/seed");
const { seedUsers } = require("./db/seedUsers");
const { seedMovies } = require("./db/seedMovies");
const { seedReviews } = require("./db/seedReviews");
const { seedComments } = require("./db/seedComments");
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

    console.log("🌱 Seeding users...");
    const users = await seedUsers();
    console.log("Users Seeded");

    console.log("🌱 Seeding movies...");
    const movies = await seedMovies();
    console.log("Movies Seeded");

    console.log("🌱 Seeding reviews...");
    const reviews = await seedReviews(users, movies);
    console.log("Reviews Seeded");

    console.log("🌱 Seeding comments...");
    const comments = await seedComments(users, reviews);
    console.log("Comments Seeded");
    console.log("Seeding Complete!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

init();
