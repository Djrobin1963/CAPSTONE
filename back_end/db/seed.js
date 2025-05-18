require("dotenv").config();
const { createTables } = require("./createTables");
const { seedUsers } = require("./seedUsers");
const { seedMovies } = require("./seedMovies");
const { seedReviews } = require("./seedReviews");
const { seedComments } = require("./seedComments");

async function seedAll() {
  try {
    console.log("🧹 Dropping and creating tables...");
    await createTables();

    console.log("🌱 Seeding users...");
    const users = await seedUsers();

    console.log("🌱 Seeding movies...");
    const movies = await seedMovies(2); // 2 pages of TMDB

    console.log("🌱 Seeding reviews...");
    const reviews = await seedReviews(users, movies);

    console.log("🌱 Seeding comments...");
    await seedComments(users, reviews);

    console.log("✅ Seeding complete!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  }
}

module.exports = { seedAll };
