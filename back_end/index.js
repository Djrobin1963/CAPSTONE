require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const client = require("./db/client");
const PORT = process.env.PORT;
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

const init = async () => {
  try {
    console.log("Connected to database");
    await client.connect();

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
