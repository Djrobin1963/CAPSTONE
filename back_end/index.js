require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const client = require("./db/client");
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const authRoutes = require("./api/auth");
const movieRoutes = require("./api/movies");
const reviewRoutes = require("./api/reviews");
const commentRoutes = require("./api/comments");
const usersRoutes = require("./api/users");
const { createTables } = require("./db/seed");
const { seedUsers } = require("./db/seedUsers");
const { seedMovies } = require("./db/seedMovies");
const { seedReviews } = require("./db/seedReviews");
const { seedComments } = require("./db/seedComments");
const { requireUser } = require("./auth/middleware");
const tmdbRoutes = require("./api/controllers/tmdb").router;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Route Mounting
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/tmdb", tmdbRoutes);

const init = async () => {
  try {
    console.log("Connected to database");
    await client.connect();

    console.log("🧹 Creating tables...");
    await createTables();
    console.log("Tables created");

    console.log("🌱 Seeding users...");
    const users = await seedUsers();

    console.log("🌱 Seeding movies...");
    const movies = await seedMovies(2); // 2 TMDB pages (~40 movies)

    console.log("🌱 Seeding reviews...");
    const reviews = await seedReviews(users, movies);

    console.log("🌱 Seeding comments...");
    await seedComments(users, reviews);

    console.log("Seeding Complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
};

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

init();
